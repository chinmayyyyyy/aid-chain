import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }, 
      },
      async authorize(credentials) {
        // Check if user exists in the database
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (user) {
          // If user exists, check password
          if (user.password === credentials?.password) {
            return { 
              id: user.user_id,  // Map Prisma's user_id to id
              email: user.email,
              username: user.username,
              role: user.role || "Donor", // Default to "Donor" role if not provided
            };
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
                role: credentials?.role || "user", // Default role if not provided
              },
            });

            return {
              id: newUser.user_id,
              email: newUser.email,
              username: newUser.username,
              role: newUser.role || "user", // Default to "user" if no role is provided
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
        token.role = user.role || "user";
        token.name = user.username || user.email.split('@')[0]; // Assign name
        token.image = user.image || null; // Use user.image if available
      }
      console.log(token)
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.role = token.role || "user";
        session.user.name = token.name || session.user.username; // Use token.name or fallback to username
        session.user.image = token.image || null; // Use token.image or fallback to null
      }
      console.log("Session" ,session)
      return session;
    },
  },  
  pages: {
    signIn: "/auth/signin", // Specify custom sign-in page
  },
  
};

export default NextAuth(authOptions);
