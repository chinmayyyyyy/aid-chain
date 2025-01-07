"use client";

import { useState } from "react";
import Container from "@/app/_layout/container";

interface PostDetailProps {
  initialPost: {
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
  };
}

const PostDetail = ({ initialPost }: PostDetailProps) => {
  const [post] = useState(initialPost);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDonateClick = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!trackingId) return;

    setIsSubmitting(true);

    const res = await fetch("/api/donations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: post.post_id,
        courier_number: trackingId,
      }),
    });

    if (res.ok) {
      alert("Donation created successfully!");
      setIsModalOpen(false);
    } else {
      alert("Something went wrong!");
    }

    setIsSubmitting(false);
  };

  return (
    <Container>
      <div className="my-10 max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 text-white">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <p className="text-sm mt-2">
            Posted by: <strong>{post.NGO.username}</strong> ({post.NGO.email})
          </p>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Details */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Details</h2>
            <p className="text-gray-600 mt-4">
              <strong className="text-gray-900">Reason:</strong> {post.reason}
            </p>
            <p className="text-gray-600 mt-2">
              <strong className="text-gray-900">Item Details:</strong>{" "}
              {post.item_details}
            </p>
            <p className="text-gray-600 mt-2">
              <strong className="text-gray-900">Address:</strong> {post.address}
            </p>
            {post.packaging_instructions && (
              <p className="text-gray-600 mt-2">
                <strong className="text-gray-900">Packaging Instructions:</strong>{" "}
                {post.packaging_instructions}
              </p>
            )}
          </section>

          {/* Status */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800">Status</h2>
            <p className="text-lg mt-2 text-indigo-600 font-medium">
              {post.status}
            </p>
          </section>

          {/* Donation Button */}
          <div className="mt-6">
            <button
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700"
              onClick={handleDonateClick}
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Tracking ID */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-2xl font-semibold mb-4">Donation Process</h3>
            <p className="text-lg mb-4">
              Thank you for your donation! Please follow the steps below:
            </p>
            <ol className="list-decimal list-inside mb-4">
              <li>Ship your donation to the NGO at the following address:</li>
              <li>
                <strong>NGO Name:</strong> {post.NGO.username}
              </li>
              <li>
                <strong>NGO Address:</strong> {post.address}
              </li>
              <li>After shipping, please enter the tracking ID provided by the courier service.</li>
            </ol>
            <p className="mb-4">Once you submit the tracking ID, your donation will be recorded.</p>
            
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Courier Tracking ID"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
            <div className="mt-4 flex justify-between">
              <button
                className="px-6 py-2 bg-gray-500 text-white rounded-lg"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default PostDetail;
