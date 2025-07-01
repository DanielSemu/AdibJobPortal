import { useEffect, useState } from "react";
import { getApplicantsByJob, getJobs } from "../services/jobsService";
import { showSuccessToast } from "../../utils/toastUtils";
import FilterForm from "./FilterApplications/FilterForm";
import ApplicantStats from "./FilterApplications/ApplicantStats";

const FilterApplicants = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(-1);
  const [workPlace, setWorkPlace] = useState([]);
  const [selectedWorkPlace, setSelectedWorkPlace] = useState("");
  const [applicant, setApplicant] = useState([]);

  const [filteredApplicants, setFilteredApplicants] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await getJobs();
      const filteredJobs = response.filter((res) => res.status === "Closed");
      setJobs(filteredJobs);
    };
    fetchJobs();
  }, []);

  const handleOpenClick = async () => {
    if (selectedJobId) {
      showSuccessToast(`Job ID ${selectedJobId} selected!`);

      const selectedWork = jobs.find((res) => res.id == selectedJobId);
      if (selectedWork && selectedWork.location) {
        const places = selectedWork.location
          .split(",")
          .map((place) => place.trim());
        setWorkPlace(places);
        setSelectedWorkPlace(places[0]); // ← use 'places', not workPlace
      } else {
        setWorkPlace([]);
        setSelectedWorkPlace("");
      }

      const applicant = await getApplicantsByJob(selectedJobId);
      const app = applicant.filter((res) => res.status === "Shortlisted");
      setApplicant(app);
    } else {
      setWorkPlace([]);
      setSelectedWorkPlace("");
      setApplicant([]);
    }
  };

  return (
    <div className="py-6 px-2 bg-white shadow-lg rounded-lg mt-10">
      {/* Job Dropdown */}
      <div className="flex gap-2">
        <label htmlFor="job-select" className="block mb-2 font-semibold">
          Select a closed job:
        </label>
        <select
          id="job-select"
          value={selectedJobId}
          onChange={(e) => setSelectedJobId(e.target.value)}
          className="border-2 border-gray-300 rounded-md w-3/4 p-2 mb-4"
        >
          <option value="">-- Select a job --</option>
          {jobs.map((job) => (
            <option key={job._id} value={job.id}>
              {job.title}
            </option>
          ))}
        </select>

        <button
          onClick={handleOpenClick}
          disabled={!selectedJobId}
          className={`p-2 mb-4 rounded-md text-white ${
            selectedJobId
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Open
        </button>
      </div>

      {/* Main Content: Left & Right Sections */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 space-y-4">
          {/* Filter Form */}
          <FilterForm selectedJobId={selectedJobId} workPlace={workPlace} />

          {/* Bottom: Table with 5 columns */}
          <div className="overflow-auto bg-white border rounded-md shadow mt-4">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Column 1</th>
                  <th className="px-4 py-2 border">Column 2</th>
                  <th className="px-4 py-2 border">Column 3</th>
                  <th className="px-4 py-2 border">Column 4</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample Row */}
                <tr>
                  <td className="px-4 py-2 border">1</td>
                  <td className="px-4 py-2 border">Data 1</td>
                  <td className="px-4 py-2 border">Data 2</td>
                  <td className="px-4 py-2 border">Data 3</td>
                  <td className="px-4 py-2 border">Data 4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2">
          <div className="w-full border-2  border-gray-300 rounded p-2 bg-gray-300 flex justify-between items-center">
            Statistical Information's
            <select
              value={selectedWorkPlace}
              onChange={(e) => setSelectedWorkPlace(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {workPlace.length === 0 ? (
                <option value="">-- No Places --</option>
              ) : (
                workPlace.map((wplace, index) => (
                  <option key={index} value={wplace}>
                    {wplace}
                  </option>
                ))
              )}
            </select>
          </div>
          {/* Applicant Stat */}
          <ApplicantStats
            applicant={applicant}
            selectedWorkPlace={selectedWorkPlace}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterApplicants;
