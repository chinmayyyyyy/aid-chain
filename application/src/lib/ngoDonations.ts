"use server"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getNgoDonations(ngoId: number) {
  return await prisma.donation.findMany({
    where: {
      NGOPost: {
        ngo_id: ngoId,
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
