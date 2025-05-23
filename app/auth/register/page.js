"use client";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "", // Change 'name' to 'username'
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      alert(res.data.message);
    } catch (error) {
      alert(
        "Error: " + (error.response?.data?.message || "Something went wrong")
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#3E2723]">
      <div className="bg-[#FAE5D3] p-10 rounded-xl shadow-2xl text-center w-96 border border-[#8D6E63]">
        <h2 className="text-3xl font-bold text-[#D84315] mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            onChange={handleChange}
            className="p-3 rounded-md border border-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#D84315] bg-[#FFF3E0] text-[#5D4037]"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="p-3 rounded-md border border-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#D84315] bg-[#FFF3E0] text-[#5D4037]"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            className="p-3 rounded-md border border-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#D84315] bg-[#FFF3E0] text-[#5D4037]"
          />
          <button
            type="submit"
            className="bg-[#D84315] text-white py-3 rounded-md text-lg font-semibold hover:bg-[#8D6E63] transition-all duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
