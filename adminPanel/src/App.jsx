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

const App = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="main-container border-2 p-4 sm:ml-64 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
         <Routes>
            <Route path="/jobs" element={<Jobs/>}/>
            <Route path="/close_jobs" element={<CloseJobs/>}/>
            <Route path="/jobs/add" element={<AddJob/>}/>
            <Route path="/jobs/add/bulk" element={<UploadBulk/>}/>
            <Route path="/edit/job_detail/:id" element={<UploadJobDetail/>}/>
            <Route path="/detail/:id" element={<JobDetail/>}/>
            <Route path="/edit/:id" element={<EditJob/>}/>
            <Route path="/categories" element={<Categories/>}/>
            <Route path="/applications" element={<Applications/>}/>
            <Route path="/filter_applicants" element={<FilterApplicants/>}/>
            <Route path="/authorize_document/:id" element={<AuthorizeDocument/>}/>
         </Routes>
      </div>
    </>
  );
};

export default App;
App;
