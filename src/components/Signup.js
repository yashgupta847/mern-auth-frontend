import React, { useState } from "react";
import axios from "axios";
import "./AuthForm.css";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Step 1: Send OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const trimmedForm = {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password.trim(),
      };

      const res = await axios.post(
        "https://mern-auth-backend-tmcf.onrender.com/api/auth/signup",
        trimmedForm
      );
      alert(res.data.message || "OTP sent to your email!");
      setShowOtp(true);
      console.log("✅ OTP sent to:", trimmedForm.email);
    } catch (err) {
      console.error("❌ Error sending OTP:", err.response?.data?.message);
      alert(err?.response?.data?.message || "Something went wrong");
    }
  };

  // 🔹 Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://mern-auth-backend-tmcf.onrender.com/api/auth/verify-otp",
        {
          email: form.email.trim(),
          otp: otp.trim(),
        }
      );
      alert(res.data.message || "OTP verified. Signup successful!");
      console.log("✅ Signup successful for:", form.email);

      // Reset everything
      setForm({ name: "", email: "", password: "" });
      setOtp("");
      setShowOtp(false);

      // Optional redirect to login
      window.location.href = "/login";
    } catch (err) {
      console.error("❌ OTP verification failed:", err.response?.data?.message);
      alert(err?.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="auth-container">
      {!showOtp ? (
        <form onSubmit={handleSubmit} className="auth-form">
          <h2 className="auth-heading">Join the Squad 🚀</h2>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="auth-form">
          <h2 className="auth-heading">Verify OTP 🔐</h2>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
          <button type="submit">Verify & Signup</button>
        </form>
      )}
    </div>
  );
};

export default Signup;
