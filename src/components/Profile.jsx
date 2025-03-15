import React from "react";

const Profile = () => {
    // Static user profile for now
    const staff = {
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Teaching Staff"
    };

    return (
        <div className="bg-white p-4 shadow-md rounded-lg flex items-center space-x-4 w-80">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                {staff.name.charAt(0)}
            </div>
            <div>
                <h2 className="text-lg font-semibold">{staff.name}</h2>
                <p className="text-gray-600 text-sm">{staff.email}</p>
                <p className="text-gray-500 text-xs">{staff.role}</p>
            </div>
        </div>
    );
};

export default Profile;
