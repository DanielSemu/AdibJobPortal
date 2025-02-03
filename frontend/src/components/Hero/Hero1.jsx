import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { BsBriefcaseFill } from "react-icons/bs";
import hero from "../../assets/hero1.jpg";
import { jobs } from "../../data/jobs";
import { Link } from "react-router-dom";

const Hero1 = () => {
  const [isResult, setIsResult] = useState(false);
  const [formData, setFormData] = useState({
    search: "",
    category: "",
    jobType: "",
  });
  const [searchResult, setSearchResult] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    let filteredJobs = [];

    if (formData.search.trim() !== "") {
      filteredJobs = jobs.filter((item) =>
        item.jobTitle.toLowerCase().includes(formData.search.toLowerCase())
      );
      setSearchResult((prev) => ({ ...prev, filteredJobs }));
    }
    if (formData.category !== "") {
      filteredJobs = jobs.filter((item) => item.category == formData.category);
      setSearchResult((prev) => ({ ...prev, filteredJobs }));
    }

    if (formData.jobType !== "") {
      filteredJobs = jobs.filter((item) => item.jobType === formData.jobType);
      setSearchResult((prev) => ({ ...prev, filteredJobs }));
    }

    setSearchResult(filteredJobs);
    setIsResult(filteredJobs.length > 0);
  };

  return (
    <>
      <section
        className="relative main-container flex justify-center items-center bg-cover"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className="absolute inset-0 bg-slate-900/30"></div>
        <div className="container z-10">
          <div className="grid grid-cols-1 text-center mt-10 relative">
            <h4 className="lg:leading-normal leading-normal text-4xl lg:text-6xl mb-5 font-bold text-white">
              Join us &amp; Explore <br /> Our Jobs.
            </h4>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Find Jobs, Employment &amp; Career Opportunities.
            </p>

            <div className="grid my-1 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-2 gap-4 w-full items-center justify-between sm:px-16 py-10 bg-white p-4 rounded-lg shadow-md">
              {/* Search Input */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  name="search"
                  value={formData.search}
                  onChange={handleChange}
                  placeholder="Search..."
                  className="border border-gray-300 rounded-lg pl-10 p-3 w-full"
                />
              </div>

              {/* Job Category Select */}
              <div className="relative">
                <MdCategory className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <select
                  className="border border-gray-300 rounded-lg pl-10 p-3 w-full"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select Job Category</option>
                  <option value="1">Business Development</option>
                  <option value="2">Marketing & Communication</option>
                  <option value="3">Project Management</option>
                  <option value="4">Customer Service</option>
                  <option value="5">Information Technology</option>
                </select>
              </div>

              {/* Job Type Select */}
              <div className="relative">
                <BsBriefcaseFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <select
                  className="border border-gray-300 rounded-lg pl-10 p-3 w-full"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                >
                  <option value="">Select Job Type</option>
                  <option value="Full-time">Full Time</option>
                  <option value="Part-time">Part Time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              {/* Search Button */}
              <button
                className="bg-[#007dda] text-white px-8 py-3 rounded-lg hover:bg-[rgb(0,140,240)] transition"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>

            {/* Search Results */}
            <div className="mt-4 flex flex-col items-center text-center">
              <span className="text-white/60">
                <span className="text-white">Popular Searches :</span> Branch
                Manager, Accountant, IT Officer, Senior Engineer
              </span>

              {isResult ? (
                <ul className="text-white mt-4 flex flex-col items-start w-full max-w-md">
                  {searchResult.map((item, index) => (
                    <li key={index} className="list-disc">
                      <Link
                        to={`/detail/${item.id}`}
                        className="text-white hover:text-blue-400"
                      >
                        {item.jobTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white mt-4">No Search Result...</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero1;
