'use client';

import { useState, useEffect } from 'react';

export default function UserDonations() {
  const [userId, setUserId] = useState<number | null>(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDonation, setSelectedDonation] = useState(null);

  // Fetch user ID on component mount
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await fetch('/api/users/id');
        const data = await res.json();

        if (data.userId) {
          setUserId(data.userId);
        } else {
          // Handle case where user ID is not found
          console.error('User ID not found');
        }
      } catch (err) {
        console.error('Error fetching user ID:', err);
      }
    };

    fetchUserId();
  }, []);

  // Fetch donations when userId is available
  useEffect(() => {
    if (userId) {
      fetch(`/api/donations/user/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setDonations(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching user donations:', err);
          setLoading(false);
        });
    }
  }, [userId]);

  const handleViewDetails = (donation) => {
    setSelectedDonation(donation);
  };

  const closeModal = () => {
    setSelectedDonation(null);
  };

  const getCardColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 border-yellow-500';
      case 'Completed':
        return 'bg-green-100 border-green-500';
      case 'Delivered':
        return 'bg-green-100 border-green-500';
      case 'Cancelled':
        return 'bg-red-100 border-red-500';
      default:
        return 'bg-gray-100 border-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!donations.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-500 text-lg ">No donations found for this user.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  w-full  bg-gray-100 py-8">
       <div className="h-64 bg-gray-200 relative">
          <img
            src="https://plus.unsplash.com/premium_photo-1683121341746-defea7bfc148?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with dynamic URL if needed
            alt="NGO Related"
            className="h-full w-full object-cover"
          />
        </div>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Your Donations</h1>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {donations.map((donation) => (
            <div
              key={donation.donation_id}
              className={`shadow-md rounded-lg p-6 flex flex-col justify-between border ${getCardColor(
                donation.status
              )}`}
            >
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {donation.NGOPost.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  <strong>Donated On:</strong>{' '}
                  {new Date(donation.created_at).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  <strong>Status:</strong> {donation.status}
                </p>
                {donation.amount && (
                  <p className="text-sm text-gray-500 mt-1">
                    <strong>Amount:</strong> ₹{donation.amount}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => handleViewDetails(donation)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">
              {selectedDonation.NGOPost.title}
            </h2>
            <p className="text-sm text-gray-700">
              <strong>Reason:</strong> {selectedDonation.NGOPost.reason}
            </p>
            <p className="text-sm text-gray-700 mt-2">
              <strong>Address:</strong> {selectedDonation.NGOPost.address}
            </p>
            <p className="text-sm text-gray-700 mt-2">
              <strong>Packaging Instructions:</strong>{' '}
              {selectedDonation.NGOPost.packaging_instructions || 'None'}
            </p>
            <p className="text-sm text-gray-700 mt-2">
              <strong>Status:</strong> {selectedDonation.status}
            </p>
            {selectedDonation.amount && (
              <p className="text-sm text-gray-700 mt-2">
                <strong>Amount:</strong> ₹{selectedDonation.amount}
              </p>
            )}
            {selectedDonation.courier_number && (
              <p className="text-sm text-gray-700 mt-2">
                <strong>Courier Number:</strong>{' '}
                {selectedDonation.courier_number}
              </p>
            )}
            <p className="text-sm text-gray-700 mt-2">
              <strong>Donated On:</strong>{' '}
              {new Date(selectedDonation.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
