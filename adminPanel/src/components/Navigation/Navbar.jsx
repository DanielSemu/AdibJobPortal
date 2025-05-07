import React from "react";
import logo from "../../assets/logo47.png";

const Navbar = () => {
  return (
    <nav className="bg-[#007dda] pl-10 sm:pl-64 fixed w-full z-20 top-0 start-0 border-b border-gray-200 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between  p-4">
        <a href="#" className="flex  items-center gap-4">
          
          <span className="self-center text-3xl text-white font-semibold whitespace-nowrap ">
            Job Portal Admin{" "}
          </span>
        </a>
        
      </div>
    </nav>
  );
};

export default Navbar;
