import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


async function main() {
  // Seed Users
  const users = await prisma.user.createMany({
    data: [
      { username: "JohnDoe", email: "john@example.com", password: "password123", role: "Donor" },
      { username: "JaneSmith", email: "jane@example.com", password: "password123", role: "Donor" },
      { username: "HelpingHandsNGO", email: "ngo@example.com", password: "ngo123", role: "NGO" },
    ],
  });

  // Seed NGO Posts
  const ngoPosts = await prisma.nGOPost.createMany({
    data: [
      {
        ngo_id: 3,
        title: "Winter Clothing Drive",
        item_details: JSON.stringify([
          { item: "Blankets", quantity: 50 },
          { item: "Sweaters", quantity: 100 },
        ]),
        reason: "To help underprivileged families stay warm during winter",
        address: "123 Charity Lane, Helping City",
        packaging_instructions: "Pack each item in a waterproof bag",
        status: "Active",
      },
      {
        ngo_id: 3,
        title: "School Supplies Collection",
        item_details: JSON.stringify([
          { item: "Notebooks", quantity: 200 },
          { item: "Pens", quantity: 500 },
        ]),
        reason: "To support education for children in rural areas",
        address: "123 Charity Lane, Helping City",
        status: "Active",
      },
    ],
  });

  // Seed Donations
  const donations = await prisma.donation.createMany({
    data: [
      {
        donor_id: 1,
        post_id: 1,
        courier_number: "AB123456789",
        amount: null,
        status: "Pending",
      },
      {
        donor_id: 2,
        post_id: 2,
        courier_number: "CD987654321",
        amount: null,
        status: "Confirmed",
      },
      {
        donor_id: 1,
        post_id: 1,
        courier_number: null,
        amount: 5000.0,
        status: "Delivered",
      },
    ],
  });

  // Seed Notifications
  const notifications = await prisma.notification.createMany({
    data: [
      {
        user_id: 1,
        message: "Your donation has been confirmed for 'Winter Clothing Drive'.",
        is_read: false,
      },
      {
        user_id: 2,
        message: "Your donation has been delivered for 'School Supplies Collection'.",
        is_read: true,
      },
      {
        user_id: 3,
        message: "A new donation has been made for 'Winter Clothing Drive'.",
        is_read: false,
      },
    ],
  });

  console.log("Seed data created successfully!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
