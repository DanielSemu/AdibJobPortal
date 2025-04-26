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
import Unauthorized from "./components/Registration/Unauthorized"; // Create this page

const Router = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="main-container p-4 sm:ml-64 border-gray-200 rounded-lg dark:border-gray-700">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Dashboard - Allow all logged users */}
          <Route
            path=""
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Jobs - Only HR and Admin */}
          <Route
            path="/jobs"
            element={
              <PrivateRoute roles={["hr_checker", "hr_maker"]}>
                <Jobs />
              </PrivateRoute>
            }
          />

          {/* Close Jobs - Only HR */}
          <Route
            path="/close_jobs"
            element={
              <PrivateRoute roles={["hr_checker"]}>
                <CloseJobs />
              </PrivateRoute>
            }
          />

          {/* Add Job - Only HR */}
          <Route
            path="/jobs/add"
            element={
              <PrivateRoute roles={["hr_maker"]}>
                <AddJob />
              </PrivateRoute>
            }
          />

          {/* Upload Jobs Bulk - Only HR */}
          <Route
            path="/jobs/add/bulk"
            element={
              <PrivateRoute roles={["hr_maker"]}>
                <UploadBulk />
              </PrivateRoute>
            }
          />

          {/* Upload Job Detail - Only HR */}
          <Route
            path="/edit/job_detail/:id"
            element={
              <PrivateRoute roles={["hr"]}>
                <UploadJobDetail />
              </PrivateRoute>
            }
          />

          {/* Job Detail - Allow all logged users */}
          <Route
            path="/detail/:id"
            element={
              <PrivateRoute>
                <JobDetail />
              </PrivateRoute>
            }
          />

          {/* Edit Job - Only HR */}
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute roles={["hr_maker"]}>
                <EditJob />
              </PrivateRoute>
            }
          />

          {/* Categories - Only Admin */}
          <Route
            path="/categories"
            element={
              <PrivateRoute roles={["hr_maker", "hr_checker"]}>
                <Categories />
              </PrivateRoute>
            }
          />

          {/* Applications - HR and Managers */}
          <Route
            path="/applications"
            element={
              <PrivateRoute roles={["hr_maker", "hr_checker"]}>
                <Applications />
              </PrivateRoute>
            }
          />

          {/* Filter Applicants - Only HR */}
          <Route
            path="/filter_applicants"
            element={
              <PrivateRoute roles={["hr_checker"]}>
                <FilterApplicants />
              </PrivateRoute>
            }
          />

          {/* Authorize Document - Manager and HR */}
          <Route
            path="/authorize_document/:id"
            element={
              <PrivateRoute roles={["hr_maker", "hr_checker"]}>
                <AuthorizeDocument />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default Router;
