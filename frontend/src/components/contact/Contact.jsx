import React, { useState } from "react";
import { contactUs } from "../../services/jobsService";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils";

const Contact = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await contactUs(formData);
        showSuccessToast("Message sent successfully!");
        setFormData({ full_name: "", email: "", content: "" });
    } catch (error) {
        console.error("Error:", error);
        if (error.response) {
          showErrorToast("Failed to send message: " + (error.response.data?.error || "Please try again."));
        } else {
          showErrorToast("An unexpected error occurred. Please check your internet connection.");
        }
    }
};


  return (
    <div id="contact" className="container mx-auto px-4 py-16">
      <div className="flex justify-center mb-12">
        <h2 className="text-[30px] font-semibold text-primary">Contact Us</h2>
      </div>

      <div className="flex justify-center">
        <div className="w-full lg:max-w-4xl md:max-w-3xl bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div className="col-span-1">
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Email */}
              <div className="col-span-1">
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* content */}
            <div className="mb-6">
              <label htmlFor="content" className="block text-lg font-medium text-gray-700">
                Your Message
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows="6"
                placeholder="Write your message here"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-primary text-secondary py-3 px-8 rounded-lg text-lg font-medium hover:bg-[#256290] transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <div className="text-center text-gray-600">
          <p className="text-lg">Or reach us at:</p>
          <p className="text-xl font-semibold mt-2">support@addisbanksc.com</p>
          <p className="mt-2">We will get back to you within 24 hours.</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
