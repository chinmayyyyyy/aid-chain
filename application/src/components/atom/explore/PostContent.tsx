"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "@/app/_layout/container";
import Button from "../button";

interface PostDetailProps {
  post_id: number;
  title: string;
  item_details: string;
  reason: string;
  address: string;
  packaging_instructions: string | null;
  created_at: string;
  updated_at: string;
  status: string;
  NGO: {
    username: string;
    email: string;
  };
  Donations: {
    donation_id: number;
    donor: {
      username: string;
    };
    amount: number | null;
    courier_number: string | null;
    status: string;
  }[];
}

const PostDetail = () => {
  const [post, setPost] = useState<PostDetailProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/ngoPosts/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post details");
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!post) return <p>Post not found</p>;

  return (
    <Container>
      <div className="my-10">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-sm text-gray-600 mt-2">
          Posted by: {post.NGO.username} ({post.NGO.email})
        </p>
        <div className="mt-5">
          <h2 className="text-xl font-semibold">Details</h2>
          <p><strong>Reason:</strong> {post.reason}</p>
          <p><strong>Item Details:</strong> {post.item_details}</p>
          <p><strong>Address:</strong> {post.address}</p>
          {post.packaging_instructions && (
            <p><strong>Packaging Instructions:</strong> {post.packaging_instructions}</p>
          )}
        </div>

        <div className="mt-5">
          <h2 className="text-xl font-semibold">Status</h2>
          <p>{post.status}</p>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold">Donations</h2>
          {post.Donations.length > 0 ? (
            <ul>
              {post.Donations.map((donation) => (
                <li key={donation.donation_id} className="mt-4 border p-3">
                  <p><strong>Donor:</strong> {donation.donor.username}</p>
                  <p><strong>Amount:</strong> ₹{donation.amount || "N/A"}</p>
                  <p><strong>Courier Number:</strong> {donation.courier_number || "N/A"}</p>
                  <p><strong>Status:</strong> {donation.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No donations yet</p>
          )}
        </div>

        <div className="mt-10">
          <Button bg="bg-blue-600">
            <p>Donate Now</p>
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default PostDetail;
