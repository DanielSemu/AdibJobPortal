import { useState } from "react";
import { AiFillDashboard } from "react-icons/ai";
import { FaUsers, FaRegFileAlt, FaInbox, FaSignOutAlt } from "react-icons/fa";
import {
  MdOutlineWork,
  MdMenu,
  MdClose,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdPersonOutline,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/logo47.png";

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { userProfile, setUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setUserProfile(null);
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  const toggleDropdown = (menuName) => {
    setOpenDropdown(openDropdown === menuName ? null : menuName);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-2 left-3 z-50 p-2 text-gray-500 bg-gray-100 rounded-lg sm:hidden"
        >
          <MdMenu className="w-6 h-6" />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 bg-white shadow-lg`}
      >
        <div className="h-full   overflow-y-auto">
          {/* Close Button (Mobile Only) */}
          <div className="flex justify-end sm:hidden">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg"
            >
              <MdClose className="w-6 h-6" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex justify-center bg-primary p-[14px]  mb-2">
            <img src={logo} className="h-10" alt="Addis Bank Logo" />
          </div>

          {/* Menu Items */}
          <ul className="space-y-2 px-3 font-medium">
            {/* Dashboard */}
            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <AiFillDashboard className="w-5 h-5 text-gray-500" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>

            {/* Vacancies Dropdown */}
            {(userProfile.role === "hr_maker" ||
              userProfile.role === "hr_checker") && (
              <>
                <li>
                  <button
                    onClick={() => toggleDropdown("vacancies")}
                    className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                  >
                    <MdOutlineWork className="w-5 h-5 text-gray-500" />
                    <span className="flex-1 ms-3 text-left">Vacancies</span>
                    {openDropdown === "vacancies" ? (
                      <MdKeyboardArrowDown className="w-5 h-5" />
                    ) : (
                      <MdKeyboardArrowRight className="w-5 h-5" />
                    )}
                  </button>
                  {openDropdown === "vacancies" && (
                    <ul className="py-2 space-y-2 pl-6">
                      <li>
                        <Link
                          to="/jobs"
                          className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                        >
                          Jobs
                        </Link>
                      </li>
                      {userProfile.role === "hr_checker" && (
                        <li>
                          <Link
                            to="/close_jobs"
                            className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                          >
                            Close Jobs
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link
                          to="/active_jobs"
                          className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                        >
                          Active Jobs
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/categories"
                          className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                        >
                          Job Categories
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>

                {/* Applications */}

                <li>
                  <button
                    onClick={() => toggleDropdown("application")}
                    className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                  >
                    <FaRegFileAlt className="w-5 h-5 text-gray-500" />
                    <span className="flex-1 ms-3 text-left">Applications</span>
                    {openDropdown === "application" ? (
                      <MdKeyboardArrowDown className="w-5 h-5" />
                    ) : (
                      <MdKeyboardArrowRight className="w-5 h-5" />
                    )}
                  </button>
                  {openDropdown === "application" && (
                    <ul className="py-2 space-y-2 pl-6">
                      <li>
                        <Link
                          to="/filter_applicants"
                          className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                        >
                          <span className="ms-3">Filter Applicants</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/selected_applicants"
                          className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                        >
                          <span className="ms-3">Selected Applicants</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/verify_applicants"
                          className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                        >
                          <span className="ms-3">Verify Applicants</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/accepted_applicants"
                          className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                        >
                          <span className="ms-3">Accepted Applicants</span>
                        </Link>
                      </li>
                     
                      {/* <li>
                        <Link
                          to="/applications"
                          className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                        >
                          <span className="ms-3">Active Job Applicants</span>
                        </Link>
                      </li> */}
                     
                    </ul>
                  )}
                </li>
              </>
            )}

            {/* Inbox */}
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <FaInbox className="w-5 h-5 text-gray-500" />
                <span className="ms-3">Inbox</span>
                <span className="ml-auto w-6 h-6 text-xs font-medium text-blue-800 bg-blue-100 rounded-full flex items-center justify-center">
                  3
                </span>
              </a>
            </li>

            {/* Users (only for admin) */}
            {userProfile.role === "admin" && (
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                >
                  <FaUsers className="w-5 h-5 text-gray-500" />
                  <span className="ms-3">Users</span>
                </a>
              </li>
            )}

            {/* Profile Dropdown */}
            <li>
              <button
                onClick={() => toggleDropdown("profile")}
                className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <MdPersonOutline className="w-5 h-5 text-gray-500" />
                <span className="flex-1 ms-3 text-left">
                  {userProfile?.email}
                </span>
                {openDropdown === "profile" ? (
                  <MdKeyboardArrowDown className="w-5 h-5" />
                ) : (
                  <MdKeyboardArrowRight className="w-5 h-5" />
                )}
              </button>
              {openDropdown === "profile" && (
                <ul className="py-2 space-y-2 pl-6">
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="w-5 h-5 text-gray-500" />
                      <span className="ms-3">Sign Out</span>
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </aside>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
