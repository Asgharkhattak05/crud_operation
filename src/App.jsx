import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Create from "./Components/Create";
import Dashboard from "./Components/Dashboard";
import Update from "./Components/Update";


const App = () => {
  return (
 <>

    <Router>

      <div className="main">
        <h1 className="main_header text-3xl mb-5">React Crud Operations</h1>
        <Routes>
          <Route path="/" element={<Create />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="update" element={<Update />} />
        </Routes>
      </div>
    </Router>
    </>
  );
};

export default App;
