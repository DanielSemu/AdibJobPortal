import React from "react";
import { FaSearch } from "react-icons/fa"; // Search icon
import { MdCategory } from "react-icons/md"; // Category icon
import { BsBriefcaseFill } from "react-icons/bs"; // Job type icon

const JobFilter = () => {
  return (
    <div id="filter_job" className="main-container">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-2 gap-4 w-full items-center justify-between sm:px-16 py-10 bg-white p-4 rounded-lg shadow-md">
        
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
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
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
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
          Search
        </button>
      </div>

      <div className="text-center p-4 px-20 w-full h-full">
        <p className="m-2">
          Popular Search: <span className="text-gray-600">Marketing, Manager,...</span>
        </p>
        <p>No Search Result...</p>
      </div>
    </div>  
  );
};

export default JobFilter;
