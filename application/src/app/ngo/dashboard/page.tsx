"use client";

import { useEffect, useState } from "react";
import getNGODetails from "@/lib/getNgoDetails";

interface NGOPost {
  post_id: number;
  item_details: string;
  reason: string;
  address: string;
  packaging_instructions?: string;
  created_at: string;
}

interface NGO {
  user_id: number;
  username: string;
  email: string;
  role: string;
  created_at: string;
  posts: NGOPost[];
}

export default function NGODashboard() {
  const [ngoDetails, setNGODetails] = useState<NGO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNGODetails = async () => {
      try {
        const data = await getNGODetails(); // Replace with dynamic NGO ID
        console.log("NGO details:", data);
        setNGODetails(data);
      } catch (error) {
        console.error("Error fetching NGO details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNGODetails();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );

  if (!ngoDetails)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">No NGO details found.</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="bg-blue-600 text-white p-6 rounded-lg shadow mb-6">
          <h1 className="text-3xl font-bold">NGO Dashboard</h1>
          <p className="text-sm mt-2">Manage and view all your details and posts here.</p>
        </header>

        {/* Basic Details */}
        <section className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Basic Details</h2>
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {ngoDetails.username}
            </p>
            <p>
              <strong>Email:</strong> {ngoDetails.email}
            </p>
            <p>
              <strong>Role:</strong> {ngoDetails.role}
            </p>
            <p>
              <strong>Created At:</strong> {new Date(ngoDetails.created_at).toLocaleDateString()}
            </p>
          </div>
        </section>

        {/* Posts Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Posts</h2>
          {ngoDetails != null ? (
            <ul className="space-y-6">
              {ngoDetails.NGOPosts.map((post) => (
                <li
                  key={post.post_id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <p>
                    <strong>Item Details:</strong> {post.item_details}
                  </p>
                  <p>
                    <strong>Reason:</strong> {post.reason}
                  </p>
                  <p>
                    <strong>Address:</strong> {post.address}
                  </p>
                  {post.packaging_instructions && (
                    <p>
                      <strong>Packaging Instructions:</strong>{" "}
                      {post.packaging_instructions}
                    </p>
                  )}
                  <p>
                    <strong>Created At:</strong> {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No posts available.</p>
          )}
        </section>
      </div>
    </div>
  );
}
