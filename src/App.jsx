// import React from "react";
// import StudentList from "./pages/StudentList";

// const App = () => {
//   return <StudentList />;
// };

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import StudentList from "./pages/StudentList";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";

function App() {
  return (
    <>
     <ToastContainer />
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
        <Route path="/studentlist" element={<StudentList />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
