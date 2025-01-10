import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma"; // Import Prisma client (adjust this import as needed)
import { getUserId } from "@/lib/getUserId";
const createDonation = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { post_id, courier_number } = req.body;

      // Ensure the required fields are present
      if (!post_id || !courier_number) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const userId = await getUserId(req, res); 
      // Create the donation in the database
      const donation = await prisma.donation.create({
        data: {
          post_id,
          courier_number,
          donor_id: userId, 
          status: "Pending",
        },
      });

      // Optionally, you can add a notification here to inform the NGO about the new donation

      return res.status(200).json(donation);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
};

export default createDonation;
