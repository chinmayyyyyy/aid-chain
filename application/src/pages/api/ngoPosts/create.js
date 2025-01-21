import prisma from "../../../lib/prisma";
import { getUserId } from "@/lib/getUserId";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ngo_id = await getUserId(req, res);
  const { title, item_details, reason, address, packaging_instructions, emergency } = req.body;

  if (!ngo_id || !item_details || !reason || !address) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newPost = await prisma.nGOPost.create({
      data: {
        ngo_id: parseInt(ngo_id),
        title,
        item_details,
        reason,
        address,
        packaging_instructions,
        emergency: Boolean(emergency), // Set emergency status
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create post", error });
  }
}
