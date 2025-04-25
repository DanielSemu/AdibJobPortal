import React from "react";
import Sidebar from "./components/Navigation/Sidebar";
import Navbar from "./components/Navigation/Navbar";
import { Routes, Route } from "react-router-dom";
import Jobs from "./components/Jobs/Jobs";
import JobDetail from "./components/Jobs/JobDetail";
import EditJob from "./components/Jobs/EditJob";
import AddJob from "./components/Jobs/AddJob";
import UploadBulk from "./components/Jobs/UploadBulk";
import UploadJobDetail from "./components/Jobs/UploadJobDetail";
import Categories from "./components/Categories/Categories";
import Applications from "./components/Applications/Applications";
import FilterApplicants from "./components/Applications/FilterApplicants";
import AuthorizeDocument from "./components/Applications/AuthorizeDocument";
import CloseJobs from "./components/Jobs/CloseJobs";
import PrivateRoute from "./privateRoute";
import Login from "./components/Registration/Login";
import Router from "./Router";

const App = () => {
  return (
    <>
      
         <Routes>
            
            <Route path="/login" element={<Login/>}/>
            <Route path="/*" element={<Router/>}/>
         </Routes>
  
    </>
  );
};

export default App;
