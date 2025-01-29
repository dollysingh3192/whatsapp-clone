import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store";

const Navbar: React.FC = () => {
  const userData = useSelector((state: RootState) => state.user.data);
  
  return (
    <div>
    <nav className="bg-black text-white px-4 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/">MyWhatsAppClone</Link>
        </div>

        {/* Sign In / Sign Up buttons */}
        <>
          {
            userData ? <span className="text-lg">Hello, {userData.name}!</span> : <div>
            <Link to="/signin">
              <button className="px-4 py-2 bg-blue-500 rounded-lg mr-4 hover:bg-blue-600">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600">
                Sign Up
              </button>
            </Link>
          </div>
          }
        </>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;