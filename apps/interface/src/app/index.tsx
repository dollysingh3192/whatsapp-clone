import React from "react";
import "./styles.css";
import { BrowserRouter, Route, Routes, useLocation, useNavigate, useMatch } from "react-router-dom";
import { Landing, Chat } from "../pages";
import { Navigate } from "react-router-dom";
import { Navbar, SignIn, SignUp } from "../components";


interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token, redirect to the landing page (sign-in)
    return <Navigate to="/signin" />;
  }

  // If token exists, render the children (protected component)
  return <>{children}</>;
};


function App() {
  const location = useLocation();

  // List of routes where the Navbar should be shown
  const navbarRoutes = ['/','/signin', '/signup'];
  
  return (
    <div>
      {navbarRoutes.some(route => location.pathname === route) && <Navbar />}
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Public Routes */}
        <Route path="/" element={<ProtectedRoute><Landing /></ProtectedRoute>} />

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
    </div>
  );
}

// Wrap the App component with BrowserRouter to use `useLocation`
const RootApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default RootApp;