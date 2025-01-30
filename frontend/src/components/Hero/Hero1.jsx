import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { BsBriefcaseFill } from "react-icons/bs";
import hero from "../../assets/hero1.jpg";

const Hero1 = () => {
    const [isResult, setIsResult]=useState(false)
  return (
    <>
      <section
        className="relative main-container flex justify-center items-center bg-cover"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className="absolute inset-0 bg-slate-900/30"></div>
        <div className="container z-1">
          <div className="grid grid-cols-1 text-center mt-10 relative">
            <h4 className="lg:leading-normal leading-normal text-4xl lg:text-6xl mb-5 font-bold text-white">
              Join us &amp; Explore <br /> Our Jobs.
            </h4>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Find Jobs, Employment &amp; Career Opportunities. Some of the
              companies we've helped recruit excellent applicants over the
              years.
            </p>
            <div className="grid my-1 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-2 gap-4 w-full items-center justify-between sm:px-16 py-10 bg-white p-4 rounded-lg shadow-md">
              {/* Text Input Field with Search Icon */}
              <div className="filter-search-form relative filter-border">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="border border-gray-300 rounded-lg pl-10 p-3 w-full"
                />
              </div>

              {/* Select Field 1 with Category Icon */}
              <div className="filter-search-form relative filter-border">
                <MdCategory className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <select className="border border-gray-300 rounded-lg pl-10 p-3 w-full">
                  <option value="">Select Job Category</option>
                  <option value="option1">Business Development</option>
                  <option value="option2">Marketing & Communication</option>
                  <option value="option2">Project Management</option>
                  <option value="option2">Customer Service</option>
                  <option value="option2">Information Technology</option>
                </select>
              </div>

              {/* Select Field 2 with Job Type Icon */}
              <div className=" filter-search-form relative filter-border">
                <BsBriefcaseFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <select className="border border-gray-300 rounded-lg pl-10 p-3 w-full">
                  <option value="">Select Job Type</option>
                  <option value="type1">Full Time</option>
                  <option value="type2">Part Time</option>
                  <option value="type3">Contract</option>
                </select>
              </div>

              {/* Filter Button */}
              <button className="bg-[#007dda] text-white px-8 py-3 rounded-lg hover:bg-[rgb(0,140,240)] transition" onClick={()=>setIsResult(!isResult)} >
                Search
              </button>
            </div>

            <div className="mt-4">
              <span className="text-white/60">
                <span className="text-white">Popular Searches :</span> Brach
                Manager, Accountant, It Officer, Accountant, Senior Engineer
              </span>
              {
                isResult?(
                    <>
                     <h4>Search Result...</h4>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda accusamus quisquam, sit eius harum quas obcaecati inventore fugiat sapiente rerum voluptatem maxime iure, dolores commodi quae vitae quia ratione hic!
                    </>
                ):(
                    <p>No Search Result...</p>
                )
              }
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero1;
