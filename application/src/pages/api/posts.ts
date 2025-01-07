// /src/pages/api/posts.ts
import { getNGOPosts } from "@/lib/posts";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ngoId } = req.query;

  if (!ngoId) {
    return res.status(400).json({ message: "Missing NGO ID." });
  }

  try {
    const posts = await getNGOPosts(Number(ngoId));
    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Failed to fetch posts." });
  }
}
