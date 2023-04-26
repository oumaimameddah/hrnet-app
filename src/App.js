import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import { useSelector } from 'react-redux';
import Error from "./pages/Error";

function App() {
  return (
      <>
        <Routes>
          <Route path="/" element={<Navigate to="/create-employee"/>}/>
          <Route path="/create-employee" element={<div> CREATE EMPLOYEE PAGE </div>}/>
          <Route path="/employee-list" element={<div> EMPLOYEE LIST </div>} />
          <Route path="*" element={<Error/>}/>
        </Routes>
      </>
  );
}

export default App;
