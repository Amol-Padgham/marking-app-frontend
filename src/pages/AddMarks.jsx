import React, { useState } from "react";

const componentNames = {
  1: "Problem-Solving Skills",
  2: "Mathematical Accuracy",
  3: "Proof and Reasoning",
  4: "Presentation",
};

const maxMarks = {
  1: 40,
  2: 30,
  3: 20,
  4: 10,
};

const AddMarksModal = ({ isOpen, onClose, onSave, studentId, assignmentId, initialMarks }) => {
  const [marks, setMarks] = useState(initialMarks || {});
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (componentId, value) => {
    const numValue = Number(value);
    if (numValue > maxMarks[componentId]) {
      setErrors((prev) => ({ ...prev, [componentId]: `Max ${maxMarks[componentId]} points allowed` }));
    } else {
      setErrors((prev) => ({ ...prev, [componentId]: "" }));
    }
    setMarks({ ...marks, [componentId]: numValue });
  };

  const handleSubmit = () => {
    if (Object.values(errors).some((err) => err)) return;
    const formattedMarks = Object.keys(marks).map((key) => ({
      component_id: Number(key),
      marks_obtained: marks[key],
    }));
    onSave({ student_id: studentId, assignment_id: assignmentId, marks: formattedMarks });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96 text-black">
        <h2 className="text-lg font-semibold mb-4">Add Marks</h2>
        {Object.keys(componentNames).map((id) => (
          <div key={id} className="mb-3">
            <label className="block text-sm font-medium">
              {componentNames[id]} (Max {maxMarks[id]} points)
            </label>
            <input
              type="number"
              min="0"
              max={maxMarks[id]}
              value={marks[id] || ""}
              onChange={(e) => handleChange(id, e.target.value)}
              className="w-full p-2 border rounded mt-1"
            />
            {errors[id] && <p className="text-red-500 text-xs">{errors[id]}</p>}
          </div>
        ))}
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded mr-2">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddMarksModal;
