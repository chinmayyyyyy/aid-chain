import { getNgoDonations } from "@/lib/ngoDonations";
import DonationsTable from "./DonationsTable";

export default async function NgoDonationsPage() {
  const ngoId = 3; // Replace with dynamic NGO ID if needed
  const donations = await getNgoDonations(ngoId);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Donations</h1>
      <DonationsTable donations={donations} />
    </div>
  );
}
