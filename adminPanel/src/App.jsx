import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Navigation/Sidebar';
import Navbar from './components/Navigation/Navbar';
import Jobs from './components/Jobs/Jobs';
import JobDetail from './components/Jobs/JobDetail';
import EditJob from './components/Jobs/EditJob';
import AddJob from './components/Jobs/AddJob';
import UploadJobDetail from './components/Jobs/UploadJobDetail';
import Categories from './components/Categories/Categories';
import FilterApplicants from './components/Applications/FilterApplicants';
import AuthorizeDocument from './components/Applications/AuthorizeDocument';
import CloseJobs from './components/Jobs/CloseJobs';
import PrivateRoute from './privateRoute';
import Login from './components/Registration/Login';
import Home from './components/Dashboard/Home';
import Unauthorized from './components/Registration/Unauthorized';
import AcceptedApplicants from './components/Applications/AcceptedApplicants';
import ActiveJobs from './components/Jobs/ActiveJobs';
import VerifyApplicants from './components/Applications/VerifyApplicants';
import RejectedApplications from './components/Applications/RejectedApplications';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';

// ErrorBoundary component
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again.</h1>;
    }
    // eslint-disable-next-line react/prop-types
    return this.props.children;
  }
}

// Layout component for protected routes
// eslint-disable-next-line react/prop-types
const ProtectedLayout = ({ children }) => (
  <>
    <Navbar />
    <Sidebar />
    <div className="main-container p-4 sm:ml-64 border-gray-200 rounded-lg dark:border-gray-700">
      {children}
    </div>
  </>
);

const App = () => {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ErrorBoundary>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ProtectedLayout>
                  <Home />
                </ProtectedLayout>
              </PrivateRoute>
            }
            exact
          />
          <Route
            path="/jobs"
            element={
              <PrivateRoute>
                <ProtectedLayout>
                  <Jobs />
                </ProtectedLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/close_jobs"
            element={
              <PrivateRoute>
                <ProtectedLayout>
                  <CloseJobs />
                </ProtectedLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/active_jobs"
            element={
              <PrivateRoute>
                <ProtectedLayout>
                  <ActiveJobs />
                </ProtectedLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/jobs/add"
            element={
              <PrivateRoute>
                <ProtectedLayout>
                  <AddJob />
                </ProtectedLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/job_detail/:id"
            element={
              <PrivateRoute>
                <ProtectedLayout>
                  <UploadJobDetail />
                </ProtectedLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <PrivateRoute>
                <ProtectedLayout>
                  <JobDetail />
                </ProtectedLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <ProtectedLayout>
                  <EditJob />
                </ProtectedLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <ProtectedLayout>
                  <Categories />
                </ProtectedLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/accepted_applicants"
            element={
              <PrivateRoute>
                <ProtectedLayout>
                  <AcceptedApplicants />
                </ProtectedLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/verify_applicants"
            element={
              <PrivateRoute>
                <ProtectedLayout>
                  <VerifyApplicants />
                </ProtectedLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/filter_applicants"
            element={
              <PrivateRoute>
                <ProtectedLayout>
                  <FilterApplicants />
                </ProtectedLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/rejected_applicants"
            element={
              <PrivateRoute>
                <ProtectedLayout>
                  <RejectedApplications />
                </ProtectedLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/authorize_document/:id"
            element={
              <PrivateRoute>
                <ProtectedLayout>
                  <AuthorizeDocument />
                </ProtectedLayout>
              </PrivateRoute>
            }
          />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </ErrorBoundary>
    </>
  );
};

export default App;