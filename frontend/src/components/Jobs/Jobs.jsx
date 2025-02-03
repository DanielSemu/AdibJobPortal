import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import logo from "../../assets/Addis_logo.jpg";
import { Link } from "react-router-dom";
import { jobs } from "../../data/jobs";

const Jobs = () => {
  
  return (
    <>
      <div id="jobs" className="main-container ">
        <div className="grid grid-cols-1 text-center">
          <h3 className="mb-4 md:text-[26px] md:leading-normal text-2xl leading-normal font-semibold">
            Latest Jobs
          </h3>
          <p className="text-slate-400 max-w-xl mx-auto">
            Search all the open positions on the web. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus commodi aliquam expedita nesciunt, rerum veniam?
          </p>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2   mt-8 gap-[30px]  px-10">
          {jobs.map((job, index) => (
            <div key={index} className="group shadow  dark:shadow-gray-700  p-6 rounded-md bg-white ">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="size-14 flex items-center justify-center bg-white  shadow dark:shadow-gray-700 rounded-md">
                    <img src={job.image} className="size-8" alt="" />
                  </div>
                  <div className="ms-3">
                    <a
                      className="block text-[16px] font-semibold hover:text-[#007dda] transition-all duration-500"
                      href="/employer-detail/1"
                    >
                      Addis Bank S.C
                    </a>
                    <span className="block text-sm text-slate-400">{job.postedDate} days ago</span>
                  </div>
                </div>
                <span className="bg-emerald-600/10 group-hover:bg-[#007dda] inline-block text-[#007dda] group-hover:text-white text-xs px-2.5 py-0.5 font-semibold rounded-full transition-all duration-500">
                  {job.jobType}
                </span>
              </div>
              <div className="mt-6">
                <Link
                  className="text-lg hover:text-[#007dda] font-semibold transition-all duration-500"
                  to={`/detail/${job.id}`}
                >
                  {job.jobTitle}
                </Link>
                <h6 className="text-base font-medium flex items-center">
                  <FaLocationDot />
                  {job.location}
                </h6>
              </div>
              <div className="mt-6">
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-[6px]">
                  <div
                    className="bg-[#007dda] h-[6px] rounded-full"
                    style={{ width: "55%" }}
                  ></div>
                </div>

                <div className="mt-2">
                  <span className="text-slate-400 text-sm">
                    <span className="text-slate-900 font-semibold inline-block">
                      {job.applied} applied
                    </span>
                    of {job.capacity} vacancy
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-12  grid-cols-1 mt-8">
          <div className="md:col-span-12 text-center">
            <a
              className="btn btn-link text-slate-400 hover:text-[#007dda] after:bg-emerald-600 duration-500 ease-in-out inline-flex items-center"
              href="/job-grid-two"
            >
              See More Jobs
              <FaArrowRight className="ml-3" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
