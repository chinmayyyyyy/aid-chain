"use client";

import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { deleteNGOPost } from "@/lib/posts";

export default function NGOPostsTab({ ngoId }: { ngoId: number }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/posts?ngoId=3`);
      if (!res.ok) {
        throw new Error("Failed to fetch posts.");
      }
      const data = await res.json();
      setPosts(data);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [ngoId]);

  const handleDelete = async (postId: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await deleteNGOPost(postId, ngoId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.post_id !== postId));
      alert("Post deleted successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to delete post.");
    }
  };

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (posts.length === 0) {
    return <p>No posts found. Create your first post!</p>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Your Posts</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <div
            key={post.post_id}
            className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
            <p className="text-sm text-gray-600 mt-2">
              <strong>Details:</strong> {post.item_details}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <strong>Reason:</strong> {post.reason}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <strong>Status:</strong> {post.status}
            </p>
            <div className="mt-4 text-right">
              <button
                onClick={() => handleDelete(post.post_id)}
                className="text-red-500 hover:text-red-700"
                title="Delete post"
              >
                <FaTrash className="inline-block mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
