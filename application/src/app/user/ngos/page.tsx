"use client"
import { useState, useEffect } from 'react';

export default function NGOsExplorePage() {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch active NGO posts
    fetch('/api/ngos')
      .then((res) => res.json())
      .then((data) => {
        setNgos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching NGOs:', err);
        setLoading(false);
      });
  }, []);

  const getCardColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-blue-100 border-blue-500';
      case 'Fulfilled':
        return 'bg-green-100 border-green-500';
      case 'Closed':
        return 'bg-gray-100 border-gray-500';
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

  if (!ngos.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">No NGOs found at the moment.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">

<div className="h-64 w-full bg-gray-200 relative">
          <img
            src="https://plus.unsplash.com/premium_photo-1682092585257-58d1c813d9b4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with dynamic URL if needed
            alt="NGO Related"
            className="h-full w-full object-cover"
          />
        </div>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Explore NGOs</h1>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {ngos.map((ngo) => (
            <div
              key={ngo.post_id}
              className={`shadow-md rounded-lg p-6 flex flex-col justify-between border ${getCardColor(
                ngo.status
              )}`}
            >
              <div>
                <h2 className="text-lg font-bold text-gray-800">{ngo.title}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  <strong>Reason:</strong> {ngo.reason}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  <strong>Address:</strong> {ngo.address}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  <strong>Status:</strong> {ngo.status}
                </p>
              </div>
              <div className="mt-4">
                {/* <button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => window.location.href = `/ngo/${ngo.post_id}`}
                >
                  View Details
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
