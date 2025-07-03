import React, { useState } from "react";
import { checkUserExistence, sendOTP, resetPassword } from "../../api/auth";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 👈 NEW
  const navigate = useNavigate();

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleCheckAndSendOTP = async () => {
    setErrorMessage(""); // Clear previous error

    if (!email || !phone) {
      setErrorMessage("Please enter both email and phone number");
      return;
    }

    if (!/^(\+251|0)?9\d{8}$/.test(phone)) {
      setErrorMessage(
        "Invalid phone format (e.g. 0912345678 or +251912345678)"
      );
      return;
    }

    try {
      console.log(email,phone);
      
      const userCheck = await checkUserExistence(email, phone);
      if (!userCheck.success) {
        setErrorMessage(userCheck.message || "User not found");
        return;
      }

      const otpCode = generateOTP();
      setGeneratedOtp(otpCode);

      const otpResponse = await sendOTP(phone, otpCode, "forgot-password");
      if (!otpResponse.success) {
        showErrorToast("Failed to send OTP");
      } else {
        showSuccessToast("OTP sent successfully");
        setOtpSent(true);
      }
    } catch (error) {
      setErrorMessage("Error checking user or sending OTP");
    }
  };

  const handleResetPassword = async () => {
    if (otp !== generatedOtp) {
      showErrorToast("Incorrect OTP");
      return;
    }

    if (newPassword !== confirmPassword) {
      showErrorToast("Passwords do not match");
      return;
    }

    if (
      newPassword.length < 6 ||
      !/[A-Z]/.test(newPassword) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
    ) {
      showErrorToast(
        "Password must be 6+ characters, include uppercase and special character"
      );
      return;
    }

    try {
      const resetResponse = await resetPassword(email, phone, newPassword);
      if (!resetResponse.success) {
        showErrorToast(resetResponse.message || "Password reset failed");
      } else {
        showSuccessToast("Password successfully reset");
        navigate("/login");
      }
    } catch (error) {
      showErrorToast("Server error during password reset");
    }
  };

  return (
    <section className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-4">
          Forgot Password
        </h2>

        {!otpSent ? (
          <>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
            />

            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0912345678 or +251912345678"
            />

            {errorMessage && (
              <div className="text-red-600 text-sm mb-3 font-medium">
                {errorMessage}
              </div>
            )}

            <button
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={handleCheckAndSendOTP}
            >
              Verify and Send OTP
            </button>
          </>
        ) : (
          <>
            <label className="block mt-4 text-sm font-medium">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              maxLength="6"
            />

            <label className="block mt-4 text-sm font-medium">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />

            <label className="block mt-4 text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />

            <button
              className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default ForgetPassword;
