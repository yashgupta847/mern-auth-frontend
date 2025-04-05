// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import Protected from "./components/Protected";
// import Logout from "./components/Logout";
// import PrivateRoute from "./components/PrivateRoute";
// import Navbar from "./components/Navbar";
// import { useState, useEffect } from "react";
// import ForgotPassword from "./components/ForgotPassword";


// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, []);

//   return (
//     <Router>
//       <Navbar isLoggedIn={isLoggedIn} />
//       <Routes>
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//         <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         <Route
//           path="/protected"
//           element={
//             <PrivateRoute>
//               <Protected />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Protected from "./components/Protected";
import Logout from "./components/Logout";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import { useState } from "react";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <Router>
  <Navbar isLoggedIn={isLoggedIn} key={isLoggedIn ? "loggedIn" : "loggedOut"} />
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
