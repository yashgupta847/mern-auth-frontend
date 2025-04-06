import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Protected from "./components/Protected";
import Logout from "./components/Logout";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userName, setUserName] = useState("");

  // Check login status on every route change
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // You can also fetch user details here if you want to show the username in the Navbar
      setIsLoggedIn(true);
      // Optionally, fetch user data here and set the userName state
    } else {
      setIsLoggedIn(false);
      setUserName(""); // Clear the username on logout
    }
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userName={userName} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/protected"
          element={
            <PrivateRoute>
              <Protected />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
