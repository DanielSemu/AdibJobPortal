import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { jobs } from "../../data/jobs";
import { categories } from "../../data/categories";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { getJobs } from "../../services/jobsService";
import logo from "../../assets/adb-whitebg-logo.png";

const JobCategoryDetail = () => {
  const { id } = useParams();
  const [jobs, setJobs] = useState([]);
  const selectedJobs = jobs.filter((item) => item.category === parseInt(id));
  const category = categories.find((item) => item.id === parseInt(id));

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        setJobs(response || []); // Ensure it defaults to an empty array
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]); // Prevent crash by setting an empty array on failure
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      {selectedJobs && (
        <>
          <div id="jobs" className="main-container ">
            <div className="grid grid-cols-1 text-center">
              <h3 className="mb-4 md:text-[26px] md:leading-normal text-2xl leading-normal font-semibold">
                Latest Jobs Under Category- {category.categoryName}
              </h3>
              <p className="text-slate-400 max-w-xl mx-auto">
                Find all the open positions under this Category.
              </p>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2   mt-8 gap-[30px]  px-10">
              {selectedJobs.map((job, index) => (
                <div
                  key={index}
                  className="group shadow  shadow-gray-700  p-6 rounded-md bg-white "
                >
                  <Link to={`/detail/${job.id}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="size-14 flex items-center justify-center bg-white  shadow shadow-gray-700 rounded-md">
                          <img src={logo} className="size-8" alt="" />
                        </div>
                        <div className="ms-3">
                          <a
                            className="block text-[16px] font-semibold hover:text-[#007dda] transition-all duration-500"
                            href="/employer-detail/1"
                          >
                            Addis Bank S.C
                          </a>
                          <span className="block text-sm text-slate-400">
                            {job.postedDate} days ago
                          </span>
                        </div>
                      </div>
                      <span className="bg-emerald-600/10 group-hover:bg-[#007dda] inline-block text-[#007dda] group-hover:text-white text-xs px-2.5 py-0.5 font-semibold rounded-full transition-all duration-500">
                        {job.type}
                      </span>
                    </div>
                    <div className="mt-6">
                      <Link
                        className="text-lg hover:text-[#007dda] font-semibold transition-all duration-500"
                        to={`/detail/${job.id}`}
                      >
                        {job.title}
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
                          {2} applied
                          </span>
                           of {20} vacancy
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            {/* <div className="grid md:grid-cols-12  grid-cols-1 mt-8">
              <div className="md:col-span-12 text-center">
                <a
                  className="btn btn-link text-slate-400 hover:text-[#007dda] after:bg-emerald-600 duration-500 ease-in-out inline-flex items-center"
                  href="/job-grid-two"
                >
                  See More Jobs
                  <FaArrowRight className="ml-3" />
                </a>
              </div>
            </div> */}
          </div>
        </>
      )}
    </>
  );
};

export default JobCategoryDetail;
