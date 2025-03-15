import React, { useState } from "react";

const AddStudentModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Pass data to parent
        setFormData({ name: "", email: "", phone: "" }); // Reset form
        onClose(); // Close modal
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Add Student</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Enter Phone"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <div className="flex justify-end space-x-2">
                        <button type="button" className="px-4 py-2 bg-gray-600 rounded" onClick={onClose}>Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 rounded">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export { AddStudentModal };
