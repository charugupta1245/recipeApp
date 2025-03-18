"use client";
import Image from "next/image";
import { useState } from "react";

export default function HeroSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "your-web3-api-key", // Replace with your Web3Forms API Key
          ...formData,
        }),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Error sending message. Please try again.");
      }
    } catch (error) {
      setStatus("Something went wrong. Please try later.");
    }
  };

  return (
    <>
      <section className="flex flex-col lg:flex-row items-center justify-between bg-[#B43F3F] text-white p-10 rounded-lg relative">
        {/* Left Section */}
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold text-[#FFF8DC]">
            Your ultimate kitchen companion.
          </h1>
          <p className="text-lg text-[#FAEBD7]">
            Tried, tested & loved by thousands of home cooks.<br></br>
            247crossingCafe is free to use*, see what all the fuss is about!
          </p>
          <p className="text-sm opacity-70 text-[#D2691E]">
            * with up to 20 recipes and 5 OCR scans
          </p>
          <button className="bg-[#FF8C00] px-6 py-3 rounded-lg text-lg font-semibold text-white hover:bg-[#FF4500]">
            Get Started
          </button>
        </div>

        {/* Right Section - Feedback Form */}
        <div className="lg:w-1/2 bg-[#FFF8DC] text-gray-900 p-8 rounded-lg shadow-lg mt-10 lg:mt-0">
          <h2 className="text-2xl font-semibold text-center mb-4 ">
            We'd love your feedback!
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded bg-[#FAEBD7]"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded bg-[#FAEBD7]"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded h-28 bg-[#FAEBD7]"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-[#B43F3F] text-white p-3 rounded-lg font-semibold hover:bg-[#A52A2A]"
            >
              Send Feedback
            </button>
          </form>
          {status && (
            <p className="text-center mt-4 text-sm bg-[#B43F3F]">{status}</p>
          )}
        </div>
      </section>
      <br></br>
    </>
  );
}
