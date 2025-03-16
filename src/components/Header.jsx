import React, { useState,useEffect  } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="bg-gray-900 p-4 flex justify-between items-center shadow-lg relative sticky top-0">
      <h1 className="text-xl font-bold text-white">Student Tracker</h1>

      <div className="relative">
        <FaUserCircle
          size={28}
          className="cursor-pointer text-white"
          onClick={toggleDropdown}
        />

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-lg p-3">
            {isLoggedIn ? (
              <div>
                <p className="text-sm font-semibold">{user?.email}</p>
                <button
                  onClick={handleLogout}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded w-full"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <p className="text-sm">Sign in to continue</p>
                <button
                  onClick={() => navigate("/login")}
                  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded w-full"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
