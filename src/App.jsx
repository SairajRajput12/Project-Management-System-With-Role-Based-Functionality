import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashBoard from './Components/Admin/AdminDashBoard';
import ManagerDashBoard from './Components/Manager/ManagerDashBoard';
import UserDashBoard from './Components/User/UserDashBoard';
import FormSelection from './Components/FormSelection';

function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // You can decode token here to get user role, for simplicity it's based on storage
      const role = localStorage.getItem('userRole');
      setUserRole(role); // Set user role after successful login
    }
  }, []);

  console.log(userRole);

  const handleSignout = async () => {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage

    if (!token) {
      alert("You are not logged in!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Clear the token from local storage
        localStorage.removeItem("token");

        // Redirect the user to the login page
        alert("You have been logged out successfully!");
        navigate("/login");
      } else {
        const data = await response.json();
        alert(`Signout failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during signout:", error);
      alert("Something went wrong. Please try again!");
    }
  };


  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={userRole ? <Navigate to={`/${userRole}`} /> : <FormSelection />}
        />
        <Route path="/admin" element={userRole === 'admin' ? <AdminDashBoard signOut={handleSignout} /> : <Navigate to="/" />} />
        <Route path="/user" element={userRole === 'user' ? <UserDashBoard signOut={handleSignout} /> : <Navigate to="/" />} />
        <Route path="/manager" element={userRole === 'manager' ? <ManagerDashBoard signOut={handleSignout} /> : <Navigate to="/" />} />
        <Route path="/login" element={<FormSelection />} />
      </Routes>
    </Router>
  );
}

export default App;
