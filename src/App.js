import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Error from "./pages/Error";
import CreateEmployee from "./pages/CreateEmployee";
import EmployeeList from "./pages/EmployeeList";

function App() {
  return (
      <>
        <Routes>
          <Route path="/" element={<Navigate to="/create-employee"/>}/>
          <Route path="/create-employee" element={<CreateEmployee />}/>
          <Route path="/employee-list"   element={<EmployeeList />} />
          <Route path="*" element={<Error/>}/>
        </Routes>
      </>
  );
}

export default App;
