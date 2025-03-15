// import axios from "axios";

// const API_URL = "http://127.0.0.1:8000/api";

// export const fetchStudents = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/students`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching students:", error);
//         return [];
//     }
// };


import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

// Fetch all students
export const fetchStudents = async () => {
    try {
        const response = await axios.get(`${API_URL}/students`);
        return response.data;
    } catch (error) {
        console.error("Error fetching students:", error);
        return [];
    }
};

// Add a new student
export const addStudent = async (newStudent) => {
    try {
        const response = await axios.post(`${API_URL}/students`, newStudent);
        return response.data;
    } catch (error) {
        console.error("Error adding student:", error);
        return null;
    }
};


export const fetchAssignmentsByStudentId = async (studentId) => {
    try {
        const response = await axios.get(`${API_URL}/assignments/${studentId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching assignments:", error);
        return null;
    }
};
