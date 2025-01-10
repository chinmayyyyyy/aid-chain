import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { AuthOptions } from 'next-auth';
import prisma from '@/lib/prisma';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res, AuthOptions);
    
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { user_id: true }, // Assuming user_id is the field name
    });

    if (!userId) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ userId: userId.user_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}
