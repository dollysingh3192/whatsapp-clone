import React from "react";
import "./styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing, Chat } from "../pages";
import { Navigate } from "react-router-dom";
import { Navbar, SignIn, SignUp } from "../components";
import { useEffect, useState } from "react";
import { API_URL } from "../constants";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token, redirect to the landing page (sign-in)
    return <Navigate to="/" />;
  }

  // If token exists, render the children (protected component)
  return <>{children}</>;
};

function App() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`${API_URL}/api/user/me`, {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUsername(data.username);
          } else {
            // Handle token error, e.g., clear localStorage
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
          // Handle network or other errors
        }
      }
    };

    fetchUser();
  }, []);
  
  return (
    <BrowserRouter>
      <Navbar username={username} /> {/* Render Navbar on all pages */}
      <Routes>
        {/* Landing page (SignIn page) accessible to everyone */}
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn onLogin={setUsername} />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Public Routes */}
        <Route path="/" element={<Landing />} />

        {/* Protected Routes */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;