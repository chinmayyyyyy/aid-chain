import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'GET') {
    try {
      const userDonations = await prisma.donation.findMany({
        where: { donor_id: parseInt(id) },
        include: {
          NGOPost: true, // Include related NGOPost details
        },
      });

      res.status(200).json(userDonations);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch user donations' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
