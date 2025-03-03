import React, { useState, useEffect, useRef } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/Addis_logo.jpg";
import { logout, profile } from "../../api/auth";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await profile();
        setUserProfile(response);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUserProfile(null);
      }
    };
    fetchUserProfile();
  }, []);

  // Toggle functions
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const closeDropdown = () => setIsDropdownOpen(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll handling
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToSection = (sectionId) => {
    closeMobileMenu();
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      scrollToSection(sectionId);
    }
  };

  // Handle automatic scrolling when navigating
  useEffect(() => {
    if (location.state?.scrollTo) {
      scrollToSection(location.state.scrollTo);
    }
  }, [location]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  // Logout function
  const handleLogout = async() => {
    try {
      const response=await logout()
      setUserProfile(null);
      closeDropdown();
      navigate("/login");    
    } catch (error) {
      console.error("Failed to logout", error);
    }
    
  };

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

        {/* Register / Login Button */}
        <div className="flex md:order-2 space-x-3">
          {userProfile ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="text-gray-600 bg-[#ffd91e] border-2 flex items-center border-transparent hover:bg-[#007dda] hover:text-[#ffd91e] hover:border-[#ffd91e] font-medium rounded-lg text-sm px-4 py-2 transition-all duration-300"
              >
                {userProfile.email} <FaAngleDown />
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
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-white rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <CiMenuBurger className="text-3xl" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between space-x-8">
          <ul className="flex space-x-8 font-medium text-white">
            <li>
              <Link to="/" onClick={() => window.scroll(0, 0)} className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <button onClick={() => handleScrollToSection("jobs")} className="hover:text-gray-300">
                Jobs
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollToSection("categories")} className="hover:text-gray-300">
                Categories
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollToSection("contact")} className="hover:text-gray-300">
                Contact
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-all duration-300 md:hidden" onClick={closeMobileMenu}>
          <div className="fixed top-0 left-0 w-64 h-full bg-[#007dda] shadow-lg flex flex-col items-center space-y-6 py-10 transition-transform transform translate-x-0" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button onClick={closeMobileMenu} className="absolute top-5 right-5 text-white text-2xl">
              ✕
            </button>

            {/* Mobile Nav Links */}
            <ul className="flex flex-col space-y-6 text-center text-white text-lg">
              <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
              <li><button onClick={() => handleScrollToSection("jobs")}>Jobs</button></li>
              <li><button onClick={() => handleScrollToSection("categories")}>Categories</button></li>
              <li><button onClick={() => handleScrollToSection("contact")}>Contact</button></li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
