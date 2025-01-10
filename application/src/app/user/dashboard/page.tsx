'use client'
import { useEffect, useState } from 'react';

interface Donation {
  donation_id: number;
  amount: number;
  status: string;
  NGOPost: {
    title: string;
    reason: string;
  };
}

interface Notification {
  notification_id: number;
  message: string;
  is_read: boolean;
}

interface NGOPost {
  post_id: number;
  title: string;
  reason: string;
}

interface User {
  user_id: number;
  username: string;
  email: string;
}

const UserDashboard = () => {
  const [userData, setUserData] = useState({
    user: null,
    donations: [],
    notifications: [],
    posts: [],
  });

  const fetchUserData = async () => {
    const res = await fetch('/api/dashboard');
    if (res.ok) {
      const data = await res.json();
      setUserData(data);
    } else {
      console.error('Failed to fetch user data');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const donationCardColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 border-green-300'; // Completed donations: Green
      case 'Pending':
        return 'bg-yellow-100 border-yellow-300'; // Pending donations: Yellow
      case 'Failed':
        return 'bg-red-100 border-red-300'; // Failed donations: Red
      case 'Delivered':
        return 'bg-green-100 border-green-300'; // Failed donations: Red
      default:
        return 'bg-gray-100 border-gray-300'; // Default case: Gray
    }
  };

  return (
    <div className="container mx-auto p-6">
      {userData.user ? (
        <>
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold text-indigo-600">
              Welcome, {userData.user.username}!
            </h1>
            <nav>
              <a href="/profile" className="text-blue-600 hover:underline mr-6">Profile</a>
              <a href="/logout" className="text-red-600 hover:underline">Logout</a>
            </nav>
          </header>

          {/* Donations Section */}
          <section className="mb-8 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Donations</h2>
            {userData.donations.length > 0 ? (
              <ul className="space-y-4">
                {userData.donations.map((donation: Donation) => (
                  <li
                    key={donation.donation_id}
                    className={`p-4 border rounded-lg shadow-sm ${donationCardColor(donation.status)}`}
                  >
                    <h3 className="font-semibold text-lg text-indigo-600">{donation.NGOPost.title}</h3>
                    <p className="text-gray-700 mb-2">{donation.NGOPost.reason}</p>
                    <p className="text-sm text-gray-500">Amount: ₹{donation.amount}</p>
                    <p className="text-sm text-gray-500">Status: {donation.status}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No donations found.</p>
            )}
          </section>

          {/* Notifications Section */}
          <section className="mb-8 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Notifications</h2>
            {userData.notifications.length > 0 ? (
              <ul className="space-y-4">
                {userData.notifications.map((notification: Notification) => (
                  <li
                    key={notification.notification_id}
                    className={`p-4 border rounded-lg shadow-sm ${notification.is_read ? 'bg-gray-100' : 'bg-yellow-50'}`}
                  >
                    <p className="text-gray-700">{notification.message}</p>
                    <p className="text-sm text-gray-500">{notification.is_read ? 'Read' : 'Unread'}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No notifications found.</p>
            )}
          </section>

          {/* Active NGO Posts Section */}
          <section className="mb-8 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Active NGO Posts</h2>
            {userData.posts.length > 0 ? (
              <ul className="space-y-4">
                {userData.posts.map((post: NGOPost) => (
                  <li key={post.post_id} className="p-4 border rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg text-indigo-600">{post.title}</h3>
                    <p className="text-gray-700 mb-2">{post.reason}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No active posts found.</p>
            )}
          </section>
        </>
      ) : (
        <div className="text-center text-gray-500">Loading your dashboard...</div>
      )}
    </div>
  );
};

export default UserDashboard;
