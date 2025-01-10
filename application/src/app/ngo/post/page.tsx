"use client";

import { useState, ChangeEvent, FormEvent } from "react";

interface NGOPostFormState {
  // ngo_id: number;
  title: string;
  item_details: string;
  reason: string;
  address: string;
  packaging_instructions?: string;
  status?: string; // Defaults to "Active"
}

export default function NGOPost() {
  const [form, setForm] = useState<NGOPostFormState>({
    // ngo_id: 0,
    title: "",
    item_details: "",
    reason: "",
    address: "",
    packaging_instructions: "",
    status: "Active",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/ngoPosts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (response.ok) {
        alert("NGO Post created successfully!");
        setForm({
          // ngo_id: 0,
          title: "",
          item_details: "",
          reason: "",
          address: "",
          packaging_instructions: "",
          status: "Active",
        }); // Reset form
      } else {
        alert(data.error || "Failed to create post");
      }
    } catch (error) {
      alert("An error occurred while creating the NGO Post.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-xl font-bold mb-4 text-gray-800">Create NGO Post</h1>
        {/* <div className="mb-4">
          <label htmlFor="ngo_id" className="block text-gray-700 font-medium mb-1">
            NGO ID
          </label>
          <input
            type="number"
            id="ngo_id"
            name="ngo_id"
            placeholder="Enter NGO ID"
            value={form.ngo_id}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter post title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="item_details" className="block text-gray-700 font-medium mb-1">
            Item Details
          </label>
          <textarea
            id="item_details"
            name="item_details"
            placeholder="Enter item details"
            value={form.item_details}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="reason" className="block text-gray-700 font-medium mb-1">
            Reason
          </label>
          <textarea
            id="reason"
            name="reason"
            placeholder="Enter reason"
            value={form.reason}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-medium mb-1">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            placeholder="Enter address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="packaging_instructions"
            className="block text-gray-700 font-medium mb-1"
          >
            Packaging Instructions (Optional)
          </label>
          <textarea
            id="packaging_instructions"
            name="packaging_instructions"
            placeholder="Enter packaging instructions"
            value={form.packaging_instructions}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 font-medium text-white rounded-lg 
            ${isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} focus:outline-none`}
        >
          {isLoading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
