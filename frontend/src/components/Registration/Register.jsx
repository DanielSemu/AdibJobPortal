import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, sendOTP } from "../../api/auth"; // Import sendOTP function
import { showErrorToast, showSuccessToast } from "../utils/toastUtils";

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    birthdate: "",
    phone_number: "",
    gender: "",
    password: "",
    confirm_password: "",
  });

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOTPChange = (e) => {
    setOtp(e.target.value);
  };  

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if passwords match
    if (formData.password !== formData.confirm_password) {
      showErrorToast("Passwords do not match.");
      return;
    }
  
    const otpCode = generateOTP();
    setGeneratedOtp(otpCode);
  
    try {
      const purpose='registration'
      const response = await sendOTP(formData.phone_number, otpCode,purpose); // Send OTP to email
      if (!response.success) {
        showErrorToast(`OTP sending failed: ${response.message}`);
      } else {
        setShowOtpModal(true); // Show modal for OTP input
      }
    } catch (error) {
      showErrorToast("Failed to send OTP.");
    }
  };
  
  const handleVerifyOTP = async () => {
    if (otp === generatedOtp) {
      try {
        const response = await registerUser(formData);
        console.log(response);
        
        if (!response.success) {
          showErrorToast(`Registration failed: ${response.message}`);
        } else {
          navigate("/login");
          showSuccessToast("Registration successful");
        }
      } catch (error) {
        showErrorToast("An unexpected error occurred");
      }
    } else {
      showErrorToast("Incorrect OTP. Please try again.");
    }
  };

  return (
    <section className="main-container flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Create an Account
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Birthdate */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Birthdate
            </label>
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Gender</label>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  className="h-4 w-4"
                  required
                />
                <label className="ml-2 text-sm text-gray-900">Male</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  className="h-4 w-4"
                  required
                />
                <label className="ml-2 text-sm text-gray-900">Female</label>
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="md:col-span-2 flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" required />
            <label className="text-sm text-gray-600">
              I accept the{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>


          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Create an Account
            </button>
          </div>
        </form>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4">Enter OTP</h2>
            <input
              type="text"
              value={otp}
              onChange={handleOTPChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              maxLength="6"
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={handleVerifyOTP}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Verify
              </button>
              <button
                onClick={() => setShowOtpModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Register;
