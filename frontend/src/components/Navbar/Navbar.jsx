import React, { useState, useEffect } from "react";
import { CiMenuBurger } from "react-icons/ci";
import logo from "../../assets/Addis_logo.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleScrollToSection = (sectionId) => {
    closeMobileMenu(); // Close menu after clicking a link

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      scrollToSection(sectionId);
    }
  };

  const scrollToSection = (sectionId) => {
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
    } else {
      document.body.style.overflow = "auto";
    }
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

        {/* Register / Login Button */}
        <div className="flex md:order-2 space-x-3">
          <Link
            to="/login"
            className="text-[#007dda] bg-[#ffd91e] border-2 border-transparent hover:bg-[#007dda] hover:text-[#ffd91e] hover:border-[#ffd91e] font-medium rounded-lg text-sm px-4 py-2 transition-all duration-300"
          >
            Sign in 
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-white rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <CiMenuBurger className="text-3xl" />
          </button>
        </div>

        {/* Navigation Links (Desktop) */}
        <div
          className="hidden md:flex items-center justify-between space-x-8"
        >
          <ul className="flex space-x-8 font-medium">
            <li>
              <Link
                to="/"
                onClick={() => window.scroll(0, 0)}
                className="text-white hover:text-gray-300"
              >
                Home
              </Link>
            </li>
            <li>
              <button
                onClick={() => handleScrollToSection("jobs")}
                className="text-white hover:text-gray-300"
              >
                Jobs
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScrollToSection("categories")}
                className="text-white hover:text-gray-300"
              >
                Categories
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScrollToSection("contact")}
                className="text-white hover:text-gray-300"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu (Toggles Open/Close) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
        onClick={closeMobileMenu}
      >
        <div
          className="fixed top-0 left-0 w-64 h-full bg-[#007dda] shadow-lg flex flex-col items-center space-y-6 py-10 transition-transform transform translate-x-0"
          onClick={(e) => e.stopPropagation()} // Prevent closing on menu click
        >
          {/* Close Button */}
          <button
            onClick={closeMobileMenu}
            className="absolute top-5 right-5 text-white text-2xl"
          >
            ✕
          </button>

          {/* Mobile Nav Links */}
          <ul className="flex flex-col space-y-6 text-center text-white text-lg">
            <li>
              <Link to="/" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li>
              <button onClick={() => handleScrollToSection("jobs")}>
                Jobs
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollToSection("categories")}>
                Categories
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollToSection("contact")}>
                Contact
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
