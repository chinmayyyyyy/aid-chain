import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import prisma from '../../lib/prisma'; // Assuming you have a Prisma client instance set up
import { AuthOptions } from 'next-auth';
import { getUserId } from '@/lib/getUserId';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Retrieve the session to get the authenticated user's information
    const userId = await getUserId(req, res); // Await the asynchronous getUserId function

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Fetch user data
    const user = await prisma.user.findUnique({
      where: { user_id: userId }, // Assuming user_id is the correct field
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch user's donations
    const donations = await prisma.donation.findMany({
      where: { donor_id: user.user_id },
      include: {
        NGOPost: true, // Include related NGO post details if needed
      },
    });

    // Fetch user's notifications
    const notifications = await prisma.notification.findMany({
      where: { user_id: user.user_id },
      orderBy: {
        created_at: 'desc', // Order by the most recent notifications
      },
    });

    // Fetch active NGO posts (for donations)
    const posts = await prisma.nGOPost.findMany({
      where: {
        status: 'Active', // Only show active donation posts
      },
      include: {
        NGO: true, // Include related NGO details
      },
    });

    // Return the data as JSON response
    res.status(200).json({ user, donations, notifications, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}
