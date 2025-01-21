import prisma from "../../../lib/prisma";


export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const posts = await prisma.nGOPost.findMany({
      include: { NGO: true },
      orderBy: [
        { emergency: 'desc' }, // Emergency posts first
        { created_at: 'desc' } // Then sort by creation date
      ]
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}
