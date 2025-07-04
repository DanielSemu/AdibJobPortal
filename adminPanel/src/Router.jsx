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
import FilterApplicants from "./components/Applications/FilterApplicants";
import AuthorizeDocument from "./components/Applications/AuthorizeDocument";
import CloseJobs from "./components/Jobs/CloseJobs";
import PrivateRoute from "./privateRoute";
import Login from "./components/Registration/Login";
import Home from "./components/Dashboard/Home";
import Unauthorized from "./components/Registration/Unauthorized"; // Create this page
import AcceptedApplicants from "./components/Applications/AcceptedApplicants";
import ActiveJobs from "./components/Jobs/ActiveJobs";
// import SendSMSForAccepted from "./components/Applications/SendSMSForAccepted";
// import SelectedApplicants from "./components/Applications/SelectedApplicants";
import VerifyApplicants from "./components/Applications/VerifyApplicants";
import RejectedApplications from "./components/Applications/RejectedApplications";

const Router = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="main-container p-4 sm:ml-64 border-gray-200 rounded-lg dark:border-gray-700">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={ <PrivateRoute>
            <Unauthorized />
            </PrivateRoute>} />

          {/* Dashboard - Allow all logged users */}
          <Route
            path=""
            element={
              <PrivateRoute >
                <Home />
              </PrivateRoute>
            }
          />

          {/* Jobs - Only HR and Admin */}
          <Route
            path="/jobs"
            element={
              <PrivateRoute >
                <Jobs />
              </PrivateRoute>
            }
          />

          {/* Close Jobs - Only HR */}
          <Route
            path="/close_jobs"
            element={
              <PrivateRoute >
                <CloseJobs />
              </PrivateRoute>
            }
          />
          <Route
            path="/active_jobs"
            element={
              <PrivateRoute >
                <ActiveJobs />
              </PrivateRoute>
            }
          />

          {/* Add Job - Only HR */}
          <Route
            path="/jobs/add"
            element={
              <PrivateRoute >
                <AddJob />
              </PrivateRoute>
            }
          />

          {/* Upload Jobs Bulk - Only HR */}
          <Route
            path="/jobs/add/bulk"
            element={
              <PrivateRoute >
                <UploadBulk />
              </PrivateRoute>
            }
          />

          {/* Upload Job Detail - Only HR */}
          <Route
            path="/edit/job_detail/:id"
            element={
              <PrivateRoute>
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
              <PrivateRoute >
                <EditJob />
              </PrivateRoute>
            }
          />

          {/* Categories - Only Admin */}
          <Route
            path="/categories"
            element={
              <PrivateRoute >
                <Categories />
              </PrivateRoute>
            }
          />

          {/* Applications - HR and Managers */}
         
          <Route
            path="/accepted_applicants"
            element={
              <PrivateRoute >
                <AcceptedApplicants />
              </PrivateRoute>
            }
          />
          <Route
            path="/verify_applicants"
            element={
              <PrivateRoute >
                <VerifyApplicants />
              </PrivateRoute>
            }
          />

          {/* Filter Applicants - Only HR */}
          <Route
            path="/filter_applicants"
            element={
              <PrivateRoute >
                <FilterApplicants />
              </PrivateRoute>
            }
          />
          {/* Filter Applicants - Only HR */}
          {/* <Route
            path="/selected_applicants"
            element={
              <PrivateRoute >
                <SelectedApplicants/>
              </PrivateRoute>
            }
          /> */}
          {/* Filter Applicants - Only HR */}
          <Route
            path="/rejected_applicants"
            element={
              <PrivateRoute >
                <RejectedApplications/>
              </PrivateRoute>
            }
          />

          {/* Authorize Document - Manager and HR */}
          <Route
            path="/authorize_document/:id"
            element={
              <PrivateRoute >
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
