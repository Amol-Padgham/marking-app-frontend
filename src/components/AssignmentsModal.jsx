import React from "react";

const componentNames = {
  1: "Problem-Solving Skills",
  2: "Mathematical Accuracy",
  3: "Proof and Reasoning",
  4: "Presentation",
};

const AssignmentsModal = ({ isOpen, onClose, assignments }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white text-black p-6 rounded-lg w-1/3 relative flex flex-col">
        <h2 className="text-xl font-bold mb-4">Student Assignments</h2>
        {assignments?.assignments?.length > 0 ? (
          <ul className="flex-1 overflow-y-auto max-h-96">
            {assignments.assignments.map((assignment) => (
              <li key={assignment.id} className="mb-4 p-4 border rounded">
                <p>
                  <strong>Title:</strong> {assignment.title}
                </p>
                <p>
                  <strong>Status:</strong> {assignment.status}
                </p>
                <p>
                  <strong>Grade:</strong>{" "}
                  {assignment.status === "pending" ? "NA" : assignment.grade}
                </p>
                {assignment.status !== "pending" && assignment.marks ? (
                  <>
                    <h3 className="font-semibold mt-2">Marks Breakdown:</h3>
                    <ul className="list-disc ml-4">
                      {assignment.marks.map((mark) => (
                        <li key={mark.component_id}>
                          <strong>{componentNames[mark.component_id]}:</strong>{" "}
                          {mark.marks_obtained} marks
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p>Marks: NA</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="flex-1">No assignments available.</p>
        )}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentsModal;
