"use server"
import prisma from "./prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";


interface NGOPost {
    post_id: number;
    item_details: string;
    reason: string;
    address: string;
    packaging_instructions?: string;
    created_at: string;
  }
  
  interface NGO {
    user_id: number;
    username: string;
    email: string;
    role: string;
    created_at: string;
    posts: NGOPost[];
  }

// Async function to fetch NGO details from the database
async function getNGODetails() {
  
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id) ;
  console.log(session);
  return await prisma.user.findUnique({
    where: { user_id: userId },
    select: {
      user_id: true,
      username: true,
      email: true,
      role: true,
      created_at: true,
      NGOPosts: {  // Correct field name
        select: {
          post_id: true,
          item_details: true,
          reason: true,
          address: true,
          packaging_instructions: true,
          created_at: true,
        },
      },
    },
  });
}

  
  export default getNGODetails;