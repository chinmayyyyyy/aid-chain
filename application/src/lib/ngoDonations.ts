"use server"
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

const prisma = new PrismaClient();

export async function getNgoDonations(ngoId: number) {
   const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id) ;
  

  return await prisma.donation.findMany({
    where: {
      NGOPost: {
        ngo_id: userId,
      },
    },
    include: {
      NGOPost: {
        select: {
          title: true,
        },
      },
      Donor: {
        select: {
          username: true,
          email: true,
        },
      },
    },
  });
}

export async function updateDonation(donationId: number, data: { status?: string; courier_number?: string }) {
  return await prisma.donation.update({
    where: {
      donation_id: donationId,
    },
    data,
  });
}
