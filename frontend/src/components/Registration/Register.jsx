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
  const [errors, setErrors] = useState({});

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
  const validateForm = () => {
    const newErrors = {};

    if (!formData.full_name.trim())
      newErrors.full_name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.birthdate) newErrors.birthdate = "Birthdate is required";

    if (!formData.phone_number.trim())
      newErrors.phone_number = "Phone number is required";
    else if (!/^(\+251|0)?9\d{8}$/.test(formData.phone_number)) {
      newErrors.phone_number =
        "Invalid phone number format (e.g. 0912345678 or +251912345678)";
    }

    if (!formData.gender) newErrors.gender = "Gender is required";

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (
      formData.password.length < 6 ||
      !/[A-Z]/.test(formData.password) || // at least one uppercase
      !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) // at least one special character
    ) {
      newErrors.password =
        "Password must be at least 6 characters, contain one uppercase letter, and one special character";
    }

    if (!formData.confirm_password)
      newErrors.confirm_password = "Confirm your password";
    else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showErrorToast("Please correct the highlighted errors.");
      return;
    }

    const otpCode = generateOTP();
    setGeneratedOtp(otpCode);

    try {
      const purpose = "registration";
      const response = await sendOTP(formData.phone_number, otpCode, purpose);
      if (!response.success) {
        showErrorToast(`OTP sending failed: ${response.message}`);
      } else {
        setShowOtpModal(true);
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
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
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
              className={`w-full p-2 border ${
                errors.full_name ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
              required
            />
            {errors.full_name && (
              <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
            )}
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
              className={`w-full p-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
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
              className={`w-full p-2 border ${
                errors.birthdate ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
              required
            />
            {errors.birthdate && (
              <p className="text-red-500 text-sm mt-1">{errors.birthdate}</p>
            )}
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
              className={`w-full p-2 border ${
                errors.phone_number ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
              required
            />
            {errors.phone_number && (
              <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Gender
            </label>
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

            {/* 🔻 Show gender error below the group */}
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
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
              className={`w-full p-2 border rounded-lg ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
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
              className={`w-full p-2 border rounded-lg ${
                errors.confirm_password ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirm_password}
              </p>
            )}
          </div>

          <div className="md:col-span-2 flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" required />
            <label className="text-sm text-gray-600">
              I accept the{" "}
              <Link to="/terms_conditions" className="text-blue-500 hover:underline">
                Terms and Conditions
              </Link>
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
