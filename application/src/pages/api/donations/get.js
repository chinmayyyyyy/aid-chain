const { default: prisma } = require("../../../lib/prisma");

const getAllDonations = async (req, res) => {
  try {
    // Fetch all donations with related Donor, NGOPost, and NGO details
    const donations = await prisma.donation.findMany({
      orderBy: {
        created_at: "desc", // Sort by most recent donations
      },
      include: {
        Donor: true, // Include donor details
        NGOPost: {
          include: {
            NGO: true, // Include NGO details within the NGOPost
          },
        },
      },
    });
    // Transform the data for consistency
    const formattedDonations = donations.map((donation) => ({
      donation_id: donation.donation_id,
      donor: {
        id: donation.Donor.id,
        username: donation.Donor.username,
      },
      ngoPost: {
        id: donation.NGOPost.id,
        title: donation.NGOPost.title,
      },
      ngo: {
        id: donation.NGOPost.NGO.username,
        name: donation.NGOPost.NGO.name,
      },
      courier_number: donation.courier_number || null,
      amount: donation.amount || null,
      status: donation.status,
      created_at: donation.created_at,
    }));
    res.status(200).json(formattedDonations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
};

export default getAllDonations;
