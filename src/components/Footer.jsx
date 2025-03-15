import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 text-center fixed bottom-0 w-full">
            <p>© {new Date().getFullYear()} Marking Application. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
