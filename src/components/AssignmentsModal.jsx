import React from "react";

const AssignmentsModal = ({ isOpen, onClose, assignments }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white text-black p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Student Assignments</h2>
        {assignments?.assignments?.length > 0 ? (
          <ul>
            {assignments.assignments.map((assignment) => (
              <li key={assignment.id} className="mb-2 p-2 border rounded">
                <p><strong>Title:</strong> {assignment.title}</p>
                <p><strong>Status:</strong> {assignment.status}</p>
                <p><strong>Grade:</strong> {assignment.grade}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No assignments available.</p>
        )}
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default AssignmentsModal;
