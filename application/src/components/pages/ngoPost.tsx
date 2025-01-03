import { useState, ChangeEvent, FormEvent } from "react";

interface NGOPostFormState {
  ngo_id: number;
  item_details: string;
  reason: string;
  address: string;
  packaging_instructions?: string;
}

export default function NGOPost() {
  const [form, setForm] = useState<NGOPostFormState>({
    ngo_id: 0,
    item_details: "",
    reason: "",
    address: "",
    packaging_instructions: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/ngoPosts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Post created successfully!");
        setForm({
          ngo_id: 0,
          item_details: "",
          reason: "",
          address: "",
          packaging_instructions: "",
        }); // Reset form
      } else {
        alert(data.error || "Failed to create post");
      }
    } catch (error) {
      alert("An error occurred while creating the post.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create NGO Post</h1>
      <input
        name="ngo_id"
        placeholder="NGO ID"
        value={form.ngo_id}
        onChange={handleChange}
        required
      />
      <textarea
        name="item_details"
        placeholder="Item Details"
        value={form.item_details}
        onChange={handleChange}
        required
      />
      <textarea
        name="reason"
        placeholder="Reason"
        value={form.reason}
        onChange={handleChange}
        required
      />
      <textarea
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        required
      />
      <textarea
        name="packaging_instructions"
        placeholder="Packaging Instructions (Optional)"
        value={form.packaging_instructions}
        onChange={handleChange}
      />
      <button type="submit">Create Post</button>
    </form>
  );
}
