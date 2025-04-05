import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AuthForm.css";

const Protected = () => {
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/auth/protected",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(res.data.message);
        setUserName(res.data.name);
      } catch (err) {
        console.log("Protected error:", err);
        setMessage("Access denied. Please login.");
      }
    };

    fetchProtectedData();
  }, []);

  return (
    <div className="auth-container">
      <div className="auth-form" style={{ textAlign: "center" }}>
        <h2
          className="auth-heading"
          style={{ fontSize: "28px", marginBottom: "20px" }}
        >
          🔒 Welcome to the Secret Zone!
        </h2>

        <p style={{ fontSize: "18px", color: "green", marginBottom: "10px" }}>
          {message}
        </p>

        {userName && (
          <p style={{ fontSize: "20px", fontWeight: "bold", color: "#00f2ff" }}>
            Hey {userName} 👾 You're In!
          </p>
        )}
          
        
      </div>
    </div>
  );
};

export default Protected;
