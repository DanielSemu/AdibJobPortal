import React from "react";
import logo from "../../assets/Addis_logo.jpg";
import { MdMenu } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className="bg-white sm:pl-64 fixed w-full z-20 top-0 start-0 border-b border-gray-200 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between  p-4">
        <a href="#" className="flex items-center gap-2">
          <img
            src={logo}
            className="h-6 md:h-8 rounded-full"
            alt="Flowbite Logo"
          />
          <span className="self-center text-3xl font-semibold whitespace-nowrap ">
            Job Portal Admin{" "}
          </span>
        </a>
        <div className="flex ">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-4 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <MdMenu className="text-2xl" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
