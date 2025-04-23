import { useState } from "react";
import { Link } from "react-router-dom"; 
import { FiMenu, FiX, FiUser } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-lg shadow-md z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
      <div className="relative flex items-center justify-between px-4 md:px-6 py-3">
        <Link to="/" className="text-white text-lg font-semibold z-10">
          𝒮𝓉𝓊𝒹𝑒𝓃𝓉 𝒫𝑜𝓇𝓉𝒻𝑜𝓁𝒾𝑜
        </Link>

        <div className="hidden md:flex items-center space-x-6 z-10">
          <Link to="/" className="text-gray-200 hover:text-white transition">Home</Link>

          {/* Show these links only if the user is logged in and NOT an admin */}
          {user && user.role !== "admin" && (
            <>
              <Link to="/courses" className="text-gray-200 hover:text-white transition">Courses</Link>
              <Link to="/certificates" className="text-gray-200 hover:text-white transition">Certificates</Link>
              <Link to="/guidance" className="text-gray-200 hover:text-white transition">Guidance</Link>
            </>
          )}
          
          <Link to="/contact" className="text-gray-200 hover:text-white transition">Contact</Link>
          <Link to="/about" className="text-gray-200 hover:text-white transition">About</Link>

          {user ? (
            <>
              {/* Show dashboard link only if the user is not an admin */}
              {user.role !== "admin" && (
                <Link to="/dashboard" className="text-gray-200 hover:text-white transition">
                  Dashboard
                </Link>
              )}
              <div className="relative group">
                <button className="flex items-center gap-2 px-5 py-2.5 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 ease-in-out">
                  <FiUser className="text-xl" />
                  <span className="text-sm font-medium tracking-wide capitalize">{user.first_name}</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/auth"  
                className="bg-teal-500 px-5 py-2 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition-transform transform hover:scale-105 duration-300"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <button 
          className="md:hidden text-white text-xl focus:outline-none z-10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        {isOpen && (
          <div className="absolute top-14 left-0 w-full bg-[#1E293B]/90 flex flex-col items-center space-y-4 py-4 z-10">
            <Link to="/" className="text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>Home</Link>

            {/* Show these links only if the user is logged in and NOT an admin */}
            {user && user.role !== "admin" && (
              <>
                <Link to="/courses" className="text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>Courses</Link>
                <Link to="/certificates" className="text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>Certificates</Link>
                <Link to="/guidance" className="text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>Guidance</Link>
              </>
            )}

            <Link to="/contact" className="text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link to="/about" className="text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>About</Link>

            {user ? (
              <>
                {/* Show dashboard link only if the user is not an admin */}
                {user.role !== "admin" && (
                  <Link to="/dashboard" className="text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>Dashboard</Link>
                )}
                <Link to="/profile" className="text-gray-200 hover:text-white transition" onClick={() => setIsOpen(false)}>View Profile</Link>
              </>
            ) : (
              <>
                <Link 
                  to="/auth"  
                  className="bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-2 text-white rounded-md shadow-md hover:from-blue-600 hover:to-blue-800 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  to="/forgot-password" 
                  className="text-gray-200 hover:text-white transition"
                  onClick={() => setIsOpen(false)}
                >
                  Forgot Password?
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
