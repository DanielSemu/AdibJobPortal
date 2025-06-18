import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const AcceptedApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("all");

  const API_URL = "/applications/admin_applicants/?status=SMS_Sent";

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axiosInstance.get(API_URL);
        setApplicants(res.data);
        setFiltered(res.data);

        // Extract unique jobs
        const jobMap = new Map();
        res.data.forEach((a) => {
          if (a.job && a.job_name) {
            jobMap.set(a.job, a.job_name);
          }
        });

        setJobs([{ id: "all", name: "-- All Jobs --" }, ...Array.from(jobMap, ([id, name]) => ({ id, name }))]);
      } catch (err) {
        console.error("Failed to fetch applicants:", err);
      }
    };

    fetchApplicants();
  }, []);

  const filterApplicants = (searchValue, jobId) => {
    let filteredList = applicants;

    if (jobId !== "all") {
      filteredList = filteredList.filter((a) => String(a.job) === String(jobId));
    }

    if (searchValue) {
      filteredList = filteredList.filter((a) =>
        [a.full_name, a.email, a.phone, a.job_name, a.selected_work_place]
          .some(field => field?.toLowerCase().includes(searchValue.toLowerCase()))
      );
    }

    setFiltered(filteredList);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterApplicants(value, selectedJobId);
  };

  const handleJobChange = (e) => {
    const jobId = e.target.value;
    setSelectedJobId(jobId);
    filterApplicants(searchTerm, jobId);
  };

  const handleDownload = async () => {
    const status = "SMS_Sent";
    const jobId = selectedJobId !== "all" ? selectedJobId : (filtered[0]?.job || "");

    if (!jobId) {
      alert("No job ID found for download.");
      return;
    }

    try {
      const res = await axiosInstance.post(
        `/applications/report/?status=${status}&job_id=${jobId}`,
        {},
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "applicants_report.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white rounded shadow-md mt-10">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex flex-col sm:flex-row w-full sm:items-center gap-3">
          <select
            className="border p-2 rounded w-full sm:w-52"
            value={selectedJobId}
            onChange={handleJobChange}
          >
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search applicants..."
            className="w-full sm:w-64 border p-2 rounded"
          />
        </div>

        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download Report
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No applicants found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Full Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Job Name</th>
                <th className="p-2 border">Location</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Gender</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((applicant) => (
                <tr key={applicant.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{applicant.full_name}</td>
                  <td className="p-2 border">{applicant.email}</td>
                  <td className="p-2 border">{applicant.phone}</td>
                  <td className="p-2 border">{applicant.job_name}</td>
                  <td className="p-2 border">{applicant.selected_work_place}</td>
                  <td className="p-2 border">{applicant.status}</td>
                  <td className="p-2 border">{applicant.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AcceptedApplicants;
