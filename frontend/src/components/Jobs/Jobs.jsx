import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { formatDistanceToNow } from "date-fns";
import logo from "../../assets/adb-whitebg-logo.png";
import { Link } from "react-router-dom";
import { getJobs } from "../../services/jobsService";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        setJobs(response || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div id="jobs" className="main-container">
      {/* Section Title */}
      <div className="grid grid-cols-1 text-center">
        <h3 className="mb-4 md:text-[30px] text-primary md:leading-normal text-2xl leading-normal font-semibold">
          Latest Jobs
        </h3>
        <p className="text-slate-500 mx-10">
          Discover exciting career opportunities at Our Bank. We're seeking
          talented and passionate individuals to join our dynamic team. Explore
          open positions that match your skills and aspirations, and take the
          next step toward a rewarding career with us.
        </p>
      </div>

      {/* Job Listings */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 mt-8 gap-[30px] px-10">
        {jobs.map((job, index) => {
          const postedDate = new Date(job.post_date);
          const deadlineDate = new Date(job.application_deadline);
          const today = new Date();

          // Total days from posted date to deadline
          const totalDays = Math.ceil((deadlineDate - postedDate) / (1000 * 60 * 60 * 24));
          
          // Days left from today
          const daysLeft = Math.max(0, Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24)));

          // Calculate progress bar width
          const elapsedDays = totalDays - daysLeft;
          const progressPercentage = totalDays > 0 ? (elapsedDays / totalDays) * 100 : 0;

          return (
            <div
              key={index}
              className="group shadow shadow-gray-700 p-6 rounded-md bg-white"
            >
              <Link to={`/detail/${job.id}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="size-14 flex items-center justify-center bg-white shadow shadow-gray-700 rounded-md">
                      <img src={logo} className="size-8" alt="Bank Logo" />
                    </div>
                    <div className="ms-3">
                      <p className="block text-[16px] text-primary font-semibold hover:text-secondary transition-all duration-500">
                        Addis Bank S.C
                      </p>
                      <span className="block text-sm text-slate-400">
                        {formatDistanceToNow(postedDate, { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                  <span className="bg-emerald-600/10 group-hover:bg-[#007dda] inline-block text-[#007dda] group-hover:text-white text-xs px-2.5 py-0.5 font-semibold rounded-full transition-all duration-500">
                    {job.job_type}
                  </span>
                </div>

                {/* Job Title and Location */}
                <div className="mt-6">
                  <p className="text-lg hover:text-[#007dda] font-semibold transition-all duration-500">
                    {job.title} Grade {job.job_grade}
                  </p>
                  <h6 className="text-base font-medium flex items-center">
                    <FaLocationDot className="mr-1" />
                    {job.location}
                  </h6>
                </div>

                {/* Progress Bar & Days Left */}
                <div className="mt-6">
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-[6px]">
                    <div
                      className="bg-[#007dda] h-[6px] rounded-full"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>

                  <div className="mt-2">
                    <span className="text-slate-400 text-sm">
                      <span className="text-slate-900 font-semibold inline-block">
                        {daysLeft} days left
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Jobs;
