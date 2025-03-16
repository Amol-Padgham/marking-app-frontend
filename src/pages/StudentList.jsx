import React, { useState, useEffect } from "react";
import {
  fetchStudents,
  addStudent,
  fetchAssignmentsByStudentId,
} from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AddStudentModal } from "../components/AddStudentModal";
import AssignmentsModal from "../components/AssignmentsModal";
import AddMarksModal from "./AddMarks";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const [assignments, setAssignments] = useState(null);
  const [isAssignmentsModalOpen, setIsAssignmentsModalOpen] = useState(false);

  const [isAddMarksModalOpen, setIsAddMarksModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    const data = await fetchStudents();
    setStudents(data);
    setLoading(false);
  };

  const handleAddStudent = async (newStudent) => {
    const response = await addStudent(newStudent);
    if (response?.student) {
      const newStudentWithAssignments = {
        ...response.student,
        assignments: [],
      };
      setStudents([...students, newStudentWithAssignments]);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, students]);

  const filteredStudents = students
    .filter((student) => {
      const name = student.name || "";
      const email = student.email || "";
      return (
        name.toLowerCase().includes(search.toLowerCase()) ||
        email.toLowerCase().includes(search.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(filteredStudents.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredStudents.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const toggleSort = (key) => {
    setSortOrder(sortKey === key && sortOrder === "asc" ? "desc" : "asc");
    setSortKey(key);
  };

  const handleViewAssignments = async (studentId) => {
    const data = await fetchAssignmentsByStudentId(studentId);
    setAssignments(data);
    setIsAssignmentsModalOpen(true);
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Header />
      <div className="p-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search..."
          className="p-1 w-48 bg-gray-700 border border-gray-600 text-white rounded text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 px-4 py-2 rounded"
        >
          Add Student
        </button>
      </div>
      <div className="flex-grow p-4 overflow-x-auto">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-700">
                  <th className="p-3 cursor-pointer" onClick={() => toggleSort("id")}>
                    ID
                  </th>
                  <th className="p-3 cursor-pointer" onClick={() => toggleSort("name")}>
                    Name
                  </th>
                  <th className="p-3 cursor-pointer" onClick={() => toggleSort("email")}>
                    Email
                  </th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Assignments</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
  {currentRecords.length > 0 ? (
    currentRecords.map((student) => (
      <tr
        key={student.id}
        className="border-b border-gray-600 hover:bg-gray-800"
      >
        <td className="p-3">{student.id}</td>
        <td className="p-3">{student.name}</td>
        <td className="p-3">{student.email}</td>
        <td className="p-3">{student.phone || "N/A"}</td>
        <td className="p-3">
          <button
            onClick={() => handleViewAssignments(student.id)}
            className={`px-3 py-1 rounded ${
              student.assignments.length > 0
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-500 cursor-not-allowed opacity-50"
            }`}
            disabled={student.assignments.length === 0}
          >
            {student.assignments.length > 0 ? "View Assignments" : "No Assignments"}
          </button>
        </td>
        <td className="p-3">
          {student.assignments.length > 0
            ? student.assignments[0].status || "Pending"
            : "N/A"}
        </td>
        <td className="p-3">
          {student.assignments.length > 0 &&
          student.assignments[0].status.toLowerCase() !== "completed" ? (
            <button
              onClick={() => {
                setAssignments(student.assignments);
                setSelectedStudentId(student.id);
                setSelectedAssignmentId(student.assignments[0].id);
                setIsAddMarksModalOpen(true);
              }}
              className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded"
            >
              Add Marks
            </button>
          ) : (
            <button
              className="px-3 py-1 bg-gray-500 opacity-50 rounded cursor-not-allowed"
              disabled
            >
              Add Marks
            </button>
          )}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7" className="p-3 text-center">
        No records found
      </td>
    </tr>
  )}
</tbody>

            </table>
            <div className="flex justify-between p-4">
              <button onClick={prevPage} disabled={currentPage === 1} className="bg-gray-700 px-3 py-1 rounded">
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={nextPage} disabled={currentPage === totalPages} className="bg-gray-700 px-3 py-1 rounded">
                Next
              </button>
            </div>
          </>
        )}
      </div>
      <AddStudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddStudent}
      />
      <AssignmentsModal
        isOpen={isAssignmentsModalOpen}
        onClose={() => setIsAssignmentsModalOpen(false)}
        assignments={assignments}
      />
      <AddMarksModal
        isOpen={isAddMarksModalOpen}
        onClose={() => setIsAddMarksModalOpen(false)}
        assignments={assignments}
        studentId={selectedStudentId}
        assignmentId={selectedAssignmentId}
        onSave={(response) => {
            console.log("Marks saved:", response);
          }}
      />
      <Footer />
    </div>
  );
};

export default StudentList;
