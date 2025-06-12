import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { BsBriefcaseFill } from "react-icons/bs";
import hero from "../../assets/heroimg1.jpg";
// import { jobs } from "../../data/jobs";
import { Link } from "react-router-dom";
import { getCategories, getJobs } from "../../services/jobsService";

const Hero1 = () => {
  const [isResult, setIsResult] = useState(false);
  const [jobs, setJobs]=useState([])
  const [categories, setCategories]=useState([])
  const [formData, setFormData] = useState({
    search: "",
    category: "",
    jobType: "",
  });
  const [searchResult, setSearchResult] = useState([]);


  useEffect(()=>{
    const fetchJobs =async()=>{
      const result=await getJobs()
      setJobs(result)
    }
    const fetchCategories= async()=>{
      const result=await getCategories()
      setCategories(result)
    }
    fetchCategories()
    fetchJobs()
  },[])
  // 66httt
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSearch = () => {
  let filteredJobs = [...jobs]; // Start with all jobs

  if (formData.search.trim() !== "") {
    filteredJobs = filteredJobs.filter((item) =>
      item.title.toLowerCase().includes(formData.search.toLowerCase())
    );
  }

  if (formData.category !== "") {
    console.log(formData);
    
    filteredJobs = filteredJobs.filter((item) => item.category == formData.category);
  }

  if (formData.jobType !== "") {
    filteredJobs = filteredJobs.filter((item) => item.job_type === formData.jobType);
  }
  
  setSearchResult(filteredJobs);
  setIsResult(filteredJobs.length > 0);
};


  return (
    <>
      <section
        className="relative main-container flex  justify-center bg-cover"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className="absolute inset-0 "></div>
        <div className="container z-10">
          <div className="grid grid-cols-1 text-center relative">
            <h4 className="lg:leading-normal leading-normal text-4xl lg:text-5xl mb-5 font-bold text-white">
              Join us &amp; Explore <br /> Our Jobs.
            </h4>
            <p className="text-black/70 text-[20px] max-w-xl mx-auto">
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
                  {categories.map((category, index)=>(
                    <option key={index} value={category.id}>{category.name}</option>
                  ))}
                 
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
              <span className="text-gray-900 text-2xl">
               Search Results...
              </span>

              {isResult ? (
                <ul className="text-white mt-4 flex flex-col items-start w-full max-w-md">
                  {searchResult.map((item, index) => (
                    <li key={index} className="list-disc">
                      <Link
                        to={`/detail/${item.id}`}
                        className="text-white hover:text-blue-400"
                      >
                        {item.title}
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
