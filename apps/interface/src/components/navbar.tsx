import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC<{username: string | null}> = ({username}) => {
  return (
    <nav className="bg-black text-white px-4 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/">MyWhatsAppClone</Link>
        </div>

        {/* Sign In / Sign Up buttons */}
        <>
          {
            username ? <span className="text-lg">Hello, {username}!</span> : <div>
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
  );
};

export default Navbar;