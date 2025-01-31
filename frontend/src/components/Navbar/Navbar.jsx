import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import logo from "../../assets/Addis_logo.jpg";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      // If not on home page, navigate to home first
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      // If already on home page, scroll to section
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
  return (
    <>
      <nav className="bg-white dark:bg-[#007dda] fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8 rounded-full" alt="Flowbite Logo" />
            <span onClick={()=>window.scroll(0,0)} className="self-center text-2xl font-bold whitespace-nowrap dark:text-white ">
              Addis Bank S.C
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Link
              to='/login'
              type="button"
              className="text-[#007dda] bg-[#ffd91e] border-2 border-transparent hover:bg-[#007dda] hover:text-[#ffd91e] hover:border-[#ffd91e] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center transition-all duration-300"
            >
              Register / Login
            </Link>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <CiMenuBurger className="text-3xl text-white" />
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-[#007dda] dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  onClick={() => window.scroll(0,0)}
                  className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent  md:p-0 "
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#jobs"
                  onClick={() => handleScrollToSection("jobs")}
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-800 md:p-0 md:dark:hover:text-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Jobs
                </a>
              </li>
              <li>
                <Link
                  to="/#categories"
                  onClick={() => handleScrollToSection("categories")}
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent text-gray-800-700 md:p-0 md:dark:hover:text-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700
                  "
                >
                  Categories
                </Link>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={() => handleScrollToSection("contact")}
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent text-gray-800-700 md:p-0 md:dark:hover:text-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
