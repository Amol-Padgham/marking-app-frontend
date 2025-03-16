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


// Login API Call
export const loginUser = async (email, password) => {
    try {
      // // Mock user credentials
      // const mockUser = {
      //   email: "teacher@example.com",
      //   password: "password123",
      //   token: "mock-token-12345",
      //   user: { email: "teacher@example.com", name: "John Doe" },
      // };
  
      // // Check if the entered credentials match the static ones
      // if (email === mockUser.email && password === mockUser.password) {
      //   localStorage.setItem("token", mockUser.token);
      //   localStorage.setItem("user", JSON.stringify(mockUser.user)); // Store user details
      //   return { token: mockUser.token, user: mockUser.user };
      // } else {
      //   throw new Error("Invalid email or password");
      // }
  
      // Uncomment the API call when the backend is ready
      
      const response = await axios.post(`${API_URL}/login`, { email, password });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user details
        return response.data;
      }
      
    } catch (error) {
      console.error("Login Error:", error.message);
      throw new Error(error.message || "Login failed");
    }
  };

  // Store marks for a student
export const storeMarks = async (marksData) => {
    try {
        const response = await axios.post(`${API_URL}/store-marks`, marksData);
        return response.data;
    } catch (error) {
        console.error("Error storing marks:", error);
        return null;
    }
};


export const registerUser = async (name, email, password, password_confirmation) => {
  const response = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
    password_confirmation,
  });
  return response.data;
};
  
