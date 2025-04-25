import React, { useState } from "react";
import { AiFillDashboard } from "react-icons/ai";
import {FaUsers,FaRegFileAlt,FaInbox,FaAngleRight,FaSignOutAlt,FaAngleDown,} from "react-icons/fa";
import { MdOutlineWork, MdMenu, MdClose } from "react-icons/md";
import { Link ,useNavigate} from "react-router-dom";
import { logout, profile } from "../../api/auth";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {userProfile,setUserProfile}=useAuth()
  const navigate = useNavigate();

   const handleLogout = async() => {
      try {
        const response=await logout()
        setUserProfile(null);
        navigate("/login");    
      } catch (error) {
        console.error("Failed to logout", error);
      }
      
    };

  return (
    <>
      {/* Menu Button for Mobile */}
      {isSidebarOpen ? (
        ""
      ) : (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-2 left-3 z-50 p-2 text-gray-500 bg-gray-100 rounded-lg sm:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <MdMenu className="w-6 h-6" />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          {/* Close Button (Mobile Only) */}
          <div className="flex justify-end sm:hidden">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg"
            >
              <MdClose className="w-6 h-6" />
            </button>
          </div>

          {/* Sidebar Menu */}
          <ul className="space-y-2 font-medium">
            <li>
            <button
                className="text-primary bg-[#ffd91e] border-2 flex items-center border-transparent hover:bg-[#007dda] hover:text-[#ffd91e] hover:border-[#ffd91e] font-medium rounded-lg text-sm px-4 py-2 transition-all duration-300"
              >
                {userProfile.email} <FaAngleDown />
              </button>
            </li>
            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <AiFillDashboard className="w-5 h-5 text-gray-500 group-hover:text-gray-900" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>

            {/* Dropdown Menu */}
            <li>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 rounded-lg group hover:bg-gray-100"
              >
                <MdOutlineWork className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                <span className="flex-1 ms-3 text-left">Vacancies</span>
                {isDropdownOpen ? (
                  <FaAngleDown className="w-4 h-5" />
                ) : (
                  <FaAngleRight className="w-4 h-5" />
                )}
              </button>
              {isDropdownOpen && (
                <ul className="py-2 space-y-2">
                  <li>
                    <Link
                      to="/jobs"
                      className="flex items-center w-full p-2 text-gray-900 rounded-lg pl-11 hover:bg-gray-100"
                    >
                      Jobs
                    </Link>
                  </li>
                 
                  <li>
                    <Link
                      to="/close_jobs"
                      className="flex items-center w-full p-2 text-gray-900 rounded-lg pl-11 hover:bg-gray-100"
                    >
                      Close Jobs
                    </Link>
                  </li> 
                  
                  <li>
                    <Link
                      to="/categories"
                      className="flex items-center w-full p-2 text-gray-900 rounded-lg pl-11 hover:bg-gray-100"
                    >
                      Job Categories
                    </Link>
                  </li>
                  {/* <li>
                    <a
                      href="#"
                      className="flex items-center w-full p-2 text-gray-900 rounded-lg pl-11 hover:bg-gray-100"
                    >
                      Interview Schedule
                    </a>
                  </li> */}
                </ul>
              )}
            </li>

            <li>
              <Link
                to="/applications"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <FaRegFileAlt className="w-5 h-5 text-gray-500 group-hover:text-gray-900" />
                <span className="ms-3">Applications</span>
              </Link>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <FaInbox className="w-5 h-5 text-gray-500 group-hover:text-gray-900" />
                <span className="ms-3">Inbox</span>
                <span className="ml-auto w-6 h-6 text-xs font-medium text-blue-800 bg-blue-100 rounded-full flex items-center justify-center">
                  3
                </span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <FaUsers className="w-5 h-5 text-gray-500 group-hover:text-gray-900" />
                <span className="ms-3">Users</span>
              </a>
            </li>

            <li>
              <a
                onClick={handleLogout}
                className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <FaSignOutAlt className="w-5 h-5 text-gray-500 group-hover:text-gray-900" />
                <span className="ms-3">Sign Out</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Overlay for Mobile */}
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
