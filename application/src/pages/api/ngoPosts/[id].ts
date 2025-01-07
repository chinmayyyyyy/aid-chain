import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma"; // Assuming you have a Prisma client instance

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const post = await prisma.nGOPost.findUnique({
      where: { post_id: Number(id) },
      include: {
        NGO: {
          select: {
            username: true,
            email: true,
          },
        },
        Donations: {
          include: {
            Donor: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
