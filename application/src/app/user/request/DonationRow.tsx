"use client";

import { useState } from "react";
import { updateDonation } from "@/lib/ngoDonations";
import { FaSpinner } from "react-icons/fa";

export default function DonationRow({ donation }: { donation: any }) {
  const [status, setStatus] = useState(donation.status);
  const [courierNumber, setCourierNumber] = useState(donation.courier_number || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    if (!courierNumber) {
      setError("Courier number is required");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await updateDonation(donation.donation_id, { status, courier_number: courierNumber });
      alert("Donation updated successfully!");
    } catch (error) {
      console.error("Error updating donation:", error);
      alert("Failed to update donation.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to assign row styles
  const getRowClass = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 hover:bg-yellow-200";
      case "Confirmed":
        return "bg-blue-100 hover:bg-blue-200";
      case "Delivered":
        return "bg-green-100 hover:bg-green-200";
      default:
        return "bg-gray-100 hover:bg-gray-200";
    }
  };

  return (
    <tr className={`${getRowClass(status)} transition-all duration-300`}>
      <td className="border px-4 py-2 text-gray-700">{donation.Donor.username}</td>
      <td className="border px-4 py-2 text-gray-700">{donation.Donor.email}</td>
      <td className="border px-4 py-2 text-gray-700">{donation.NGOPost.title}</td>
      <td className="border px-4 py-2 text-gray-700">{donation.amount || "N/A"}</td>
      <td className="border px-4 py-2">
        <input
          type="text"
          value={courierNumber}
          onChange={(e) => setCourierNumber(e.target.value)}
          placeholder="Enter courier number"
          className="w-full border px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </td>
      <td className="border px-4 py-2">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Delivered">Delivered</option>
        </select>
      </td>
      <td className="border px-4 py-2 text-center">
        <button
          onClick={handleUpdate}
          disabled={loading}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white transition ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading && <FaSpinner className="animate-spin" />}
          {loading ? "Updating..." : "Update"}
        </button>
      </td>
    </tr>
  );
}
