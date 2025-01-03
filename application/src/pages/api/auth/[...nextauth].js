import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma"; // Prisma client import

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check if user exists in the database
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (user) {
          // If user exists, check password
          if (user.password === credentials?.password) {
            return { id: user.user_id, email: user.email, username: user.username };
          }
          return null; // Invalid password
        } else {
          // If user doesn't exist, create a new one
          try {
            const newUser = await prisma.user.create({
              data: {
                email: credentials?.email ?? "",
                password: credentials?.password ?? "",
                username: credentials?.username || credentials?.email?.split("@")[0] || "NewUser", // Default username (can be improved)
              },
            });

            return {
              id: newUser.user_id,
              email: newUser.email,
              username: newUser.username,
            };
          } catch (error) {
            console.error("Error creating user:", error);
            return null;
          }
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
