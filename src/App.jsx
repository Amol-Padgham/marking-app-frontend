// import React from "react";
// import StudentList from "./pages/StudentList";

// const App = () => {
//   return <StudentList />;
// };

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import StudentList from "./pages/StudentList";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
        <Route path="/studentlist" element={<StudentList />} />
      </Routes>
    </Router>
  );
}

export default App;
