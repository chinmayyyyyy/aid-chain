"use client";
import React, { useEffect, useState } from "react";

const DonationsPage = () => {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    fetch("/api/donations/get")
      .then((res) => res.json())
      .then((data) => {
        setDonations(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching donations:", error);
        setLoading(false); // Set loading to false if there is an error
      });
  }, []);

  const handleViewMore = (donation) => {
    setSelectedDonation(donation);
  };

  const handleCloseDetails = () => {
    setSelectedDonation(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        All Donations
      </h1>

      {/* Loader section */}
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="loader">
            <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-current border-t-transparent rounded-full" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      ) : donations.length === 0 ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-2xl text-gray-500 mb-4">No donations available!</p>
            <p className="text-gray-400">
              Donations will appear here once made by users.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <div
              key={donation.donation_id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {donation.ngoPost.title}
              </h3>
              <p className="text-gray-600">
                NGO: <span className="font-medium">{donation.ngo.id}</span>
              </p>
              <p className="text-gray-600">
                Donor: <span className="font-medium">{donation.donor.username}</span>
              </p>
              <p className="text-gray-600">
                Amount:{" "}
                <span className="font-medium">
                  {donation.amount ? `₹${donation.amount.toFixed(2)}` : "N/A"}
                </span>
              </p>
              <p
                className={`text-sm font-semibold ${
                  donation.status === "Pending"
                    ? "text-yellow-600"
                    : donation.status === "Confirmed"
                    ? "text-blue-600"
                    : "text-green-600"
                }`}
              >
                Status: {donation.status}
              </p>
              <button
                onClick={() => handleViewMore(donation)}
                className="mt-4 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
              >
                View More
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedDonation.ngoPost.title}
            </h2>
            <p className="text-gray-600">
              Donotion Id:{" "}
              <span className="font-medium">{selectedDonation.donation_id}</span>
            </p>
            <p className="text-gray-600">
              Donor:{" "}
              <span className="font-medium">{selectedDonation.donor.username}</span>
            </p>
            <p className="text-gray-600">
              Amount:{" "}
              <span className="font-medium">
                {selectedDonation.amount ? `₹${selectedDonation.amount.toFixed(2)}` : "N/A"}
              </span>
            </p>
            <p className="text-gray-600">
              Courier Number:{" "}
              {selectedDonation.courier_number || "No courier provided"}
            </p>
            <p className="text-gray-600">
              Status: <span className="font-medium">{selectedDonation.status}</span>
            </p>
            <p className="text-gray-600">
              Date:{" "}
              {new Date(selectedDonation.created_at).toLocaleDateString()}
            </p>
            <button
              onClick={handleCloseDetails}
              className="mt-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationsPage;
