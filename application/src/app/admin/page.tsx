"use client";

import { deleteNGOPost } from "@/lib/posts";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/ngoPosts/get")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handleDelete = async (postId, ngoId) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await deleteNGOPost(postId, ngoId);
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.post_id !== postId)
      );
      alert("Post deleted successfully!");
    } catch (err) {
      console.error("Error deleting post:", err);
      setError(err.message || "Failed to delete post.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        NGO Posts
      </h1>
      {error && (
        <div className="text-red-500 text-center mb-4">
          <p>{error}</p>
        </div>
      )}
      {posts.length === 0 ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-2xl text-gray-500 mb-4">No posts available!</p>
            <p className="text-gray-400">
              Check back later to view the latest NGO posts.
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full border border-gray-200 bg-white">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="border border-gray-300 px-6 py-3">Title</th>
                <th className="border border-gray-300 px-6 py-3">NGO</th>
                <th className="border border-gray-300 px-6 py-3">Items</th>
                <th className="border border-gray-300 px-6 py-3">Status</th>
                <th className="border border-gray-300 px-6 py-3">Created At</th>
                <th className="border border-gray-300 px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.post_id}
                  className="hover:bg-gray-50 transition duration-300"
                >
                  <td className="border border-gray-300 px-6 py-4">
                    {post.title}
                  </td>
                  <td className="border border-gray-300 px-6 py-4">
                    {post.NGO.username} {/* Display NGO name */}
                  </td>
                  <td className="border border-gray-300 px-6 py-4">
                    {post.item_details}
                  </td>
                  <td
                    className={`border border-gray-300 px-6 py-4 font-semibold ${
                      post.status === "Active"
                        ? "text-green-600"
                        : post.status === "Fulfilled"
                        ? "text-blue-600"
                        : "text-red-600"
                    }`}
                  >
                    {post.status}
                  </td>
                  <td className="border border-gray-300 px-6 py-4">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-6 py-4">
                    <button
                      onClick={() => handleDelete(post.post_id, post.ngo_id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete post"
                    >
                      <FaTrash className="inline-block mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PostsPage;
