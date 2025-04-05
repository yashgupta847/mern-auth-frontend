// import React, { useState } from "react";
// import axios from "axios";
// import "./AuthForm.css";

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         email: form.email.trim(),
//         password: form.password,
//       });

//       alert(res.data.message || "Login successful!");

//       // 🪙 Save token in localStorage or cookie
//       localStorage.setItem("token", res.data.token);

//       // 🔐 Navigate to protected page (optional)
//       // window.location.href = "/protected";
//     } catch (err) {
//       console.error("Login error:", err.response?.data?.message);
//       alert(err?.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <form onSubmit={handleLogin} className="auth-form">
//         <h2 className="auth-heading">Welcome Back 👋</h2>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ import this
import "./AuthForm.css";

const Login = ({ setIsLoggedIn }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // ✅ create navigate instance

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      const token = res.data.token;

      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      alert("User logged in successfully!");

      navigate("/protected"); // ✅ redirect to protected page
    } catch (err) {
      console.error(err.response?.data?.message);
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-heading">Welcome Back 👋</h2>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
