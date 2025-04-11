import React, { useEffect, useState } from "react";
import { filterApplicants, getJobs } from "../services/jobsService";
import ReusableTable from "../ui/ReausableTable";

const FilterApplicants = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredApplicants,setFilteredApplicants]=useState([])
  const [locations, setLocations] = useState([]); 
  const [errors,setErrors]=useState({})
  const [selectedResume, setSelectedResume] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [criteria, setCriteria] = useState({
    selectedJob: "",
    selectedLocation: "",
    minExperienceYears: "",
    gender: "",
    minCGPA: "",
    minExit: "",
  });

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await getJobs();
      const filteredJobs = response.filter((res) => res.status === "Closed");
      setJobs(filteredJobs);
    };
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCriteria({ ...criteria, [name]: value });
  };


  // This will be triggered when the job is selected
  const handleJobSelect = (e) => {
    const { name, value } = e.target;
    const selectedJobId=e.target.value
    
    setCriteria({ ...criteria, [name]: value });
    
    

    const selectedJob = jobs.find((job) => job.id == selectedJobId);
    if (selectedJob) {
      const locationsArray = selectedJob.location.split(","); 
      setLocations(locationsArray); 
    //   setCriteria({ ...criteria, selectedLocation:"" }); 
    }
  };
  const validateForm = () => {
    let newErrors = {};
  
    if (!criteria.selectedJob) {
      newErrors.selectedJob = "Job is required.";
    }
    if (!criteria.selectedLocation) {
      newErrors.selectedLocation = "Location is required.";
    }
    if (criteria.minExperienceYears && isNaN(criteria.minExperienceYears)) {
      newErrors.minExperienceYears = "Experience must be a number.";
    }
    if (criteria.minCGPA && isNaN(criteria.minCGPA)) {
      newErrors.minCGPA = "CGPA must be a number.";
    }
    if (criteria.minExit && isNaN(criteria.minExit)) {
      newErrors.minExit = "Exit score must be a number.";
    }
  
    setErrors(newErrors);
  
    return Object.keys(newErrors).length === 0; // ✅ Valid if no errors
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;  // If form is invalid, stop
  
    const response=await filterApplicants(criteria)
    if (response.length == 0){
      setErrors({...errors, emptyFiltered:"There Is no Applicant That Satisfies the Above Criteria"})
    }
    
    setFilteredApplicants(response)
  };
  

  const columns = [
    //   { header: "name", accessor: "name", cell:()=>("yyyy-xxxx-jjjj") },
      { header: "Full Name", accessor: "full_name" },
      { header: "Job ", accessor: "job_name" },
      { header: "Gender", accessor: "gender" },
      { header: "Age", accessor: "genderd",
        cell:(row)=>{
          const birthDate=new Date(row.birth_date)
          const today=new Date()
          let age =today.getFullYear() - birthDate.getFullYear()
          const monthDiff= today.getMonth() -birthDate.getMonth()
          if(monthDiff <0 ||(monthDiff === 0 && today.getDate() < birthDate.getDate())){
            age--
          }
          return age
        }
       },
      { header: "Status", accessor: "status" },
      {
        header: "Resume",
        accessor: "resume",
        cell: (row) => (
          row.resume ? (
            <button
              onClick={() => {
                setSelectedResume(row.resume);
                setIsModalOpen(true);
              }}
              className="text-blue-500 underline"
            >
              View Resume
            </button>
          ) : (
            <span className="text-gray-400">No Resume</span>
          )
        ),
      },          

    ];

  return (
    <div className="p-6">
      <form action="" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Filter Applications</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Select Job */}
        <div>
          <label className="block mb-1 font-semibold">Select Job</label>
          <select
            name="selectedJob"
            value={criteria.selectedJob}
            onChange={handleJobSelect} // Handle job selection
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="">-- Select Job --</option>
            {jobs.map((item, index) => (
              <option key={index} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        {/* Select Location */}
        <div>
          <label className="block mb-1 font-semibold">Select Job Location</label>
          <select
            name="selectedLocation"
            value={criteria.selectedLocation}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            disabled={!locations.length} 
            required
          >
            <option value="">-- Select Location --</option>
            {locations.map((location, index) => (
              <option key={index} value={location.trim()}>
                {location.trim()}
              </option>
            ))}
          </select>
        </div>

       

        {/* Minimum Experience */}
        <div>
          <label className="block mb-1 font-semibold">Minimum Experience (Years)</label>
          <input
            type="number"
            name="minExperienceYears"
            value={criteria.minExperienceYears}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-1 font-semibold">Gender</label>
          <select
            name="gender"
            value={criteria.gender}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          >
            <option value="">-- Any Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Minimum CGPA */}
        <div>
        
          <label className="block mb-1 font-semibold">Minimum CGPA</label>
          {errors.minCGPA && <p className="text-red-500 text-sm">{errors.minCGPA}</p>}
          <input
            type="number"
            name="minCGPA"
            step="0.01"
            max={4.00}
            min={2.00}
            value={criteria.minCGPA}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>
        {/* Minimum Exit Exam Result */}
        <div>
        
          <label className="block mb-1 font-semibold">Minimum Exit-Exam Result</label>
          {errors.minExit && <p className="text-red-500 text-sm">{errors.minExit}</p>}
          <input
            type="number"
            name="minExit"
            max={100}
            min={50}
            value={criteria.minExit}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
      >
        Apply Filter
      </button>
      </form>
      {errors.emptyFiltered&&(<p className="text-red-500 text-sm">{errors.emptyFiltered}</p>)}
      <ReusableTable
        columns={columns}
        records={filteredApplicants}
        // addAddress={"/categories/add"}
        title={"Filtered Applicants"}
      />
      {isModalOpen && selectedResume && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-4 rounded-lg w-4/5 h-full relative">
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-2 right-2 text-red-500"
      >
        ✖️
      </button>
      <iframe
        src={`http://192.168.2.32:8000${selectedResume}`}
        className="w-full h-full"
        frameBorder="0"
        title="Resume Viewer"
      ></iframe>
    </div>
  </div>
)}
    </div>
  );
};

export default FilterApplicants;
