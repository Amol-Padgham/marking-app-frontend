import React from "react";

const Header = () => {
    return (
        <header className="bg-blue-600 text-white py-4 px-6 fixed top-0 w-full shadow-md flex justify-between items-center">
            <h1 className="text-xl font-bold">Marking Application</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="/" className="hover:underline">Home</a></li>
                    <li><a href="/students" className="hover:underline">Students</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
