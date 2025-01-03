import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { post_id } = req.body;

  if (!post_id) {
    return res.status(400).json({ error: "Post ID is required" });
  }

  try {
    await prisma.nGOPost.delete({
      where: { post_id },
    });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
}
