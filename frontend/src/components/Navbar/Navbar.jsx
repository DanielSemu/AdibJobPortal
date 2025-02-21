import React, { useState, useEffect, useRef } from "react";
import { CiMenuBurger } from "react-icons/ci";
import logo from "../../assets/Addis_logo.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { profile } from "../../api/auth";
import { FaAngleDown } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await profile();
      setUserProfile(response);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUserProfile(null);
    }
  };

  const handleLogout = () => {
    setUserProfile(null);
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  return (
    <nav className="bg-[#007dda] fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} className="h-8 rounded-full" alt="Addis Bank Logo" />
          <span
            onClick={() => window.scroll(0, 0)}
            className="text-2xl font-bold text-white cursor-pointer"
          >
            Addis Bank S.C
          </span>
        </Link>

        {/* User Profile Dropdown */}
        <div className="flex md:order-2 space-x-3">
          {userProfile ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="text-gray-600 bg-[#ffd91e] border-2 flex items-center  border-transparent hover:bg-[#007dda] hover:text-[#ffd91e] hover:border-[#ffd91e] font-medium rounded-lg text-sm px-4 py-2 transition-all duration-300"
              >
                {userProfile.email} <FaAngleDown/>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <ul className="py-2 text-gray-700">
                    <li>
                      <Link
                        to="/applications"
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        Applications
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-[#007dda] bg-[#ffd91e] border-2 border-transparent hover:bg-[#007dda] hover:text-[#ffd91e] hover:border-[#ffd91e] font-medium rounded-lg text-sm px-4 py-2 transition-all duration-300"
            >
              Sign in
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-white rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <CiMenuBurger className="text-3xl" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
