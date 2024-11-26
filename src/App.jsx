import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashBoard from './Components/Admin/AdminDashBoard';
import ManagerDashBoard from './Components/Manager/ManagerDashBoard';
import UserDashBoard from './Components/User/UserDashBoard';
import FormSelection from './Components/FormSelection';

function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Retrieve user role from localStorage
      const role = localStorage.getItem('userRole');
      setUserRole(role);
    }
  }, []);

  const handleSignout = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      alert('You are not logged in!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Clear token and role from local storage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');

        // Notify user
        alert('You have been logged out successfully!');

        // Reload to reset state
        window.location.href = '/login';
      } else {
        const data = await response.json();
        alert(`Signout failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during signout:', error);
      alert('Something went wrong. Please try again!');
    }
  };

  

  return (
    <Routes>
      {/* Redirect to the appropriate dashboard if logged in */}
      <Route
        path="/"
        element={userRole ? <Navigate to={`/${userRole}`} /> : <Navigate to="/login" />}
      />
      {/* Admin dashboard */}
      <Route
        path="/admin"
        element={userRole === 'admin' ? <AdminDashBoard signOut={handleSignout} /> : <Navigate to="/login" />}
      />
      {/* User dashboard */}
      <Route
        path="/user"
        element={userRole === 'user' ? <UserDashBoard signOut={handleSignout} /> : <Navigate to="/login" />}
      />
      {/* Manager dashboard */}
      <Route
        path="/manager"
        element={userRole === 'manager' ? <ManagerDashBoard signOut={handleSignout} /> : <Navigate to="/login" />}
      />
      {/* Login or role selection form */}
      <Route path="/login" element={<FormSelection />} />
    </Routes>
  );
}

export default App;
