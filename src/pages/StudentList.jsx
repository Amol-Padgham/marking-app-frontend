import React, { useEffect, useState, useMemo } from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";
import { fetchStudents } from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Profile from "../components/Profile";
import { motion } from "framer-motion";

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [pageIndex, setPageIndex] = useState(0);
    const pageSize = 5; // Show only 5 records per page

    // Fetch students only once on component mount
    useEffect(() => {
        fetchStudents().then(setStudents);
    }, []);

    // Memoized filtered students to optimize search performance
    const filteredStudents = useMemo(() => {
        return students.filter(student =>
            student.FirstName.toLowerCase().includes(globalFilter.toLowerCase()) ||
            student.LastName.toLowerCase().includes(globalFilter.toLowerCase()) ||
            student.StudentNumber.includes(globalFilter)
        );
    }, [students, globalFilter]);

    // Paginate students
    const paginatedStudents = useMemo(() => {
        const start = pageIndex * pageSize;
        return filteredStudents.slice(start, start + pageSize);
    }, [filteredStudents, pageIndex, pageSize]);

    const columns = [
        { header: "Student Number", accessorKey: "StudentNumber" },
        { header: "Name", accessorFn: row => `${row.FirstName} ${row.LastName}` },
        { header: "Email", accessorKey: "Email" },
        { 
            header: "Assignments", 
            accessorFn: row => row.assignments.length > 0 
                ? row.assignments.map(a => `${a.AssignmentID} (${a.Status})`).join(", ") 
                : "No Assignments"
        }
    ];

    const table = useReactTable({
        data: paginatedStudents,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    });

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="container mx-auto py-24 px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-lg rounded-lg p-6"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-blue-600">Student and Assignment List</h1>
                        <Profile />
                    </div>

                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search students..."
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                    />

                    {/* Table */}
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id} className="bg-gray-200">
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id} className="border p-2">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.length > 0 ? (
                                table.getRowModel().rows.map(row => (
                                    <tr key={row.id} className="border">
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id} className="border p-2">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="text-center p-4">No records found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
                            disabled={pageIndex === 0}
                            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                        >
                            Previous
                        </button>

                        <span className="px-4 py-2">
                            Page {pageIndex + 1} of {Math.ceil(filteredStudents.length / pageSize)}
                        </span>

                        <button
                            onClick={() => setPageIndex((prev) => (prev + 1 < Math.ceil(filteredStudents.length / pageSize) ? prev + 1 : prev))}
                            disabled={(pageIndex + 1) * pageSize >= filteredStudents.length}
                            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};

export default StudentList;
