import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const users = await prisma.user.createMany({
    data: [
      { username: 'John Doe', email: 'john.doe@example.com', password: 'password123', role: 'Donor' },
      { username: 'Jane Smith', email: 'jane.smith@example.com', password: 'password123', role: 'NGO' },
      { username: 'Admin User', email: 'admin@example.com', password: 'adminpassword', role: 'Admin' },
    ],
  });

  console.log(`Created ${users.count} users`);

  // Create NGO Posts
  const ngoPost = await prisma.nGOPost.create({
    data: {
      ngo_id: 2, // Jane Smith (NGO)
      item_details: JSON.stringify({ items: ['Blankets', 'Clothing'] }),
      reason: 'Help for flood victims',
      address: '123 NGO Street, Cityville',
      packaging_instructions: 'Use eco-friendly bags',
    },
  });

  console.log('Created NGO Post:', ngoPost);

  // Create Requests
  const request = await prisma.request.create({
    data: {
      user_id: 1, // John Doe (Donor)
      item_type: 'Food',
      quantity: 50,
      description: 'Canned food for local shelter',
      priority: true,
    },
  });

  console.log('Created Request:', request);

  // Create Donations
  const donation = await prisma.donation.create({
    data: {
      donor_id: 1, // John Doe
      request_id: request.request_id,
      donation_type: 'Money',
      amount: 100.5,
      description: 'Donation for food',
    },
  });

  console.log('Created Donation:', donation);

  // Create Notifications
  const notification = await prisma.notification.create({
    data: {
      user_id: 2, // Jane Smith (NGO)
      message: 'New donation received for your post',
    },
  });

  console.log('Created Notification:', notification);

  // Create Donation History
  const donationHistory = await prisma.donationHistory.create({
    data: {
      donation_id: donation.donation_id,
      donor_id: 1, // John Doe
    },
  });

  console.log('Created Donation History:', donationHistory);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
