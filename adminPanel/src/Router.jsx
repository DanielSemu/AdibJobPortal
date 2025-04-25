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
import Dashboard from "./components/Dashboard/Dashboard";

const Router = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="main-container  p-4 sm:ml-64 border-gray-200  rounded-lg dark:border-gray-700">
         <Routes>
            <Route path="" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
            <Route path="/jobs" element={<PrivateRoute><Jobs/></PrivateRoute>}/>
            <Route path="/close_jobs" element={<PrivateRoute><CloseJobs/></PrivateRoute>}/>
            <Route path="/jobs/add" element={<PrivateRoute><AddJob/></PrivateRoute>}/>
            <Route path="/jobs/add/bulk" element={<PrivateRoute><UploadBulk/></PrivateRoute>}/>
            <Route path="/edit/job_detail/:id" element={<PrivateRoute><UploadJobDetail/></PrivateRoute>}/>
            <Route path="/detail/:id" element={<PrivateRoute><JobDetail/></PrivateRoute>}/>
            <Route path="/edit/:id" element={<PrivateRoute><EditJob/></PrivateRoute>}/>
            <Route path="/categories" element={<PrivateRoute><Categories/></PrivateRoute>}/>
            <Route path="/applications" element={<PrivateRoute><Applications/></PrivateRoute>}/>
            <Route path="/filter_applicants" element={<PrivateRoute><FilterApplicants/></PrivateRoute>}/>
            <Route path="/authorize_document/:id" element={<PrivateRoute><AuthorizeDocument/></PrivateRoute>}/>
         </Routes>
      </div>
    </>
  );
};


export default Router