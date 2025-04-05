import React, { useState } from "react";
import axios from "axios";
import "./AuthForm.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password

  const sendOTP = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/send-otp", { email });
      alert("OTP sent to your email");
      setStep(2);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to send OTP");
    }
  };

  const verifyOTP = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp });
      alert("OTP verified");
      setStep(3);
    } catch (err) {
      alert(err?.response?.data?.message || "Invalid OTP");
    }
  };

  const resetPassword = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        newPassword,
      });
      alert("Password reset successfully! Please login.");
      window.location.href = "/login";
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="auth-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step === 1) sendOTP();
          else if (step === 2) verifyOTP();
          else resetPassword();
        }}
        className="auth-form"
      >
        <h2 className="auth-heading">Reset Your Password 🛠️</h2>

        {step === 1 && (
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}

        {step === 2 && (
          <input
            type="text"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        )}

        {step === 3 && (
          <input
            type="password"
            placeholder="Enter new password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        )}

        <button type="submit">
          {step === 1 ? "Send OTP" : step === 2 ? "Verify OTP" : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
