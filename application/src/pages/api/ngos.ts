
import prisma from '@/lib/prisma'; // assuming you have a Prisma client setup

export default async function handler(req, res) {
  try {
    const ngos = await prisma.nGOPost.findMany({
      where: {
        status: 'Active',
      },
      include: {
        NGO: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    });

    res.status(200).json(ngos);
  } catch (error) {
    console.error('Error fetching NGOs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
