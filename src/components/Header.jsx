import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [user, setUser] = useState({ email: "teacher@example.com" });

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const handleLogin = () => {
        setIsLoggedIn(true);
        setShowDropdown(false);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setShowDropdown(false);
    };

    return (
        <header className="bg-gray-900 p-4 flex justify-between items-center shadow-lg relative sticky top-0">
            <h1 className="text-xl font-bold">Student Management</h1>

            <div className="relative">
                <FaUserCircle size={28} className="cursor-pointer" onClick={toggleDropdown} />

                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-lg p-3">
                        {isLoggedIn ? (
                            <div>
                                <p className="text-sm font-semibold">{user.email}</p>
                                <button onClick={handleLogout} className="mt-2 bg-red-500 text-white px-3 py-1 rounded w-full">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div>
                                <p className="text-sm">Sign in to continue</p>
                                <button onClick={handleLogin} className="mt-2 bg-blue-500 text-white px-3 py-1 rounded w-full">
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
