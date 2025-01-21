"use client";

import Container from '@/app/_layout/container';
import CharityDonationBox from '@/components/atom/explore/charity_donation_box';
import React, { useEffect, useState } from 'react';

const CharityListing = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/ngoPosts/get'); // Replace with your API route
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <div className="my-[5em] flex gap-5 flex-wrap">
        {posts.map((post) => (
          <CharityDonationBox
            key={post.post_id}
            path={`/explore/${post.post_id}`}
            title={post.title}
            location={post.address}
            description={post.NGO.username}
            emergency={post.emergency}
          />
        ))}
      </div>
    </Container>
  );
};

export default CharityListing;
