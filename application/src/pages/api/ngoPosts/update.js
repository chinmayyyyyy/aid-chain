import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { post_id, item_details, reason, address, packaging_instructions, status } = req.body;

  if (!post_id) {
    return res.status(400).json({ error: "Post ID is required" });
  }

  try {
    const updatedPost = await prisma.nGOPost.update({
      where: { post_id },
      data: {
        item_details,
        reason,
        address,
        packaging_instructions,
        status,
      },
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
}
