"use client";

import DonationRow from "./DonationRow";

export default function DonationsTable({ donations }: { donations: any[] }) {
  return (
    <table className="table-auto bg-white w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border px-4 py-2">Donor Name</th>
          <th className="border px-4 py-2">Donor Email</th>
          <th className="border px-4 py-2">Post Title</th>
          <th className="border px-4 py-2">Amount</th>
          <th className="border px-4 py-2">Courier Number</th>
          <th className="border px-4 py-2">Status</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {donations.map((donation) => (
          <DonationRow key={donation.donation_id} donation={donation} />
        ))}
      </tbody>
    </table>
  );
}
