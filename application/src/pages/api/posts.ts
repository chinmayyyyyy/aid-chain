// /src/pages/api/posts.ts
import { getUserId } from "@/lib/getUserId";
import { getNGOPosts } from "@/lib/posts";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const userId = await getUserId(req, res); 

  if (!userId) {
    return res.status(400).json({ message: "Missing NGO ID." });
  }

  try {
    const posts = await getNGOPosts(Number(userId));
    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Failed to fetch posts." });
  }
}
