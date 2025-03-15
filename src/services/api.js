import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const fetchStudents = async () => {
    try {
        const response = await axios.get(`${API_URL}/students`);
        return response.data;
    } catch (error) {
        console.error("Error fetching students:", error);
        return [];
    }
};
