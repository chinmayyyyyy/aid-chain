"use server"
import prisma from "./prisma";

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
async function getNGODetails(ngoId: number) {
  return await prisma.user.findUnique({
    where: { user_id: ngoId },
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