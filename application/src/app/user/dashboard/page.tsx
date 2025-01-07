"use client"
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
        const data = await getNGODetails(3); // Replace with dynamic NGO ID
        setNGODetails(data);
        console.log("NGO details:", data);
      } catch (error) {
        console.error("Error fetching NGO details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNGODetails();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!ngoDetails) return <div>No NGO details found.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">NGO Dashboard</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold">Basic Details</h2>
        <p><strong>Name:</strong> {ngoDetails.username}</p>
        <p><strong>Email:</strong> {ngoDetails.email}</p>
        <p><strong>Role:</strong> {ngoDetails.role}</p>
        <p><strong>Created At:</strong> {new Date(ngoDetails.created_at).toLocaleDateString()}</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold">Posts</h2>
        {ngoDetails.NGOPosts.length > 0 ? (
          <ul className="list-disc pl-6">
            {ngoDetails.NGOPosts.map((post) => (
              <li key={post.post_id} className="mb-4">
                <p><strong>Item Details:</strong> {post.item_details}</p>
                <p><strong>Reason:</strong> {post.reason}</p>
                <p><strong>Address:</strong> {post.address}</p>
                {post.packaging_instructions && (
                  <p><strong>Packaging Instructions:</strong> {post.packaging_instructions}</p>
                )}
                <p><strong>Created At:</strong> {new Date(post.created_at).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
}

