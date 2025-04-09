import React, { useEffect, useState } from "react";
import { getJobs } from "../services/jobsService";

const FilterApplicants = () => {
  const [jobs, setJobs] = useState([]);
  const [locations, setLocations] = useState([]); 
  const [errors,setErrors]=useState({})
  const [criteria, setCriteria] = useState({
    selectedJob: "",
    selectedLocation: "",
    educationLevel: "",
    fieldOfStudy: "",
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
    let newErrors = { ...errors }; 
  
    if (criteria.minCGPA < 2 || criteria.minCGPA > 4) {
      newErrors.minCGPA = "Your Cumulative GPA should be between 2 and 4";
    }
    else {
        newErrors.minCGPA = ""; 
      }
    if(criteria.minExit < 50 || criteria.minExit > 100){
        newErrors.minExit="Your Exit Exam Score Should be between 50 and 100"
    }
     else {
      newErrors.minExit = ""; 
    }
    setErrors(newErrors); 
  };
  
  const handleFilter = () => {
    console.log("Filter Applicants with:", criteria);
    validateForm(); 
  
    if (Object.values(errors).every((error) => error === "")) {
        console.log("Form is valid, sending data to backend...");


        
    }
  };
  

  return (
    <div className="p-6">
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
            disabled={!locations.length} // Disable if no locations available
          >
            <option value="">-- Select Location --</option>
            {locations.map((location, index) => (
              <option key={index} value={location.trim()}>
                {location.trim()}
              </option>
            ))}
          </select>
        </div>

        {/* Education Level */}
        <div>
          <label className="block mb-1 font-semibold">Education Level</label>
          <input
            type="text"
            name="educationLevel"
            value={criteria.educationLevel}
            onChange={handleChange}
            placeholder="e.g., Bachelor, Master"
            className="w-full border p-2 rounded-md"
          />
        </div>

        {/* Field of Study */}
        <div>
          <label className="block mb-1 font-semibold">Field of Study</label>
          <input
            type="text"
            name="fieldOfStudy"
            value={criteria.fieldOfStudy}
            onChange={handleChange}
            placeholder="e.g., Computer Science"
            className="w-full border p-2 rounded-md"
          />
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
        onClick={handleFilter}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
      >
        Apply Filter
      </button>
      
    </div>
  );
};

export default FilterApplicants;
