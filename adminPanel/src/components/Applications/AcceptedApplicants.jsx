import React, { useEffect, useState } from "react";
import {
  getAcceptedApplicants,
  exportAcceptedApplicants,
  getJobs,
} from "../services/jobsService";
import Select from "react-select";

const AcceptedApplicants = () => {
  const [acceptedApplicant, setAcceptedApplicant] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("");

  const options = jobs.map((job) => ({
    value: job.id,
    label: job.title,
  }));

  const fetchAcceptedApplicants = async () => {
    const response = await getAcceptedApplicants();
    setAcceptedApplicant(response);
  };
  const fetchJobs = async () => {
    try {
      const response = await getJobs();
      const filteredJobs = response.filter((res) => res.status === "Closed");
      setJobs(filteredJobs);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  const handlePdfDownload = async () => {
    if (!selectedJobId) {
      alert("Please select a job first.");
      return;
    }

    try {
      const response = await fetch(
        `http://192.168.2.32:8000/api/export_applicant_pdf/?job_id=${selectedJobId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
          },
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "accepted_applicants.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  const handleExportApplicants = async () => {
    try {
      setIsExporting(true);
      const response = await exportAcceptedApplicants();
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "accepted_applicants.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export applicants.");
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    fetchAcceptedApplicants();
    fetchJobs();
  }, []);

  const handleSelectChange = (selectedOption) => {
    setSelectedJobId(selectedOption?.value || "");
    const result = jobs.find((job) => job.id === selectedOption.value);
    const searchKey = result.title;
    setSearchTerm(searchKey);
  };

  const filteredApplicants = acceptedApplicant.filter((applicant) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      applicant.full_name?.toLowerCase().includes(lowerSearch) ||
      applicant.job_name?.toLowerCase().includes(lowerSearch) ||
      applicant.selected_work_place?.toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col flex-wrap md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 className="text-3xl text-nowrap font-bold text-blue-900">
          Accepted Applicants
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded w-64"
          />
          <button
            onClick={handleExportApplicants}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={isExporting}
          >
            {isExporting ? "Exporting..." : "Export All Applicants"}
          </button>
        </div>
      </div>
      <div className="mb-2 w-full flex gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <label className="block text-nowrap text-gray-700 font-semibold mb-2">
            Select Job :
          </label>
          <Select
            options={options}
            value={options.find((opt) => opt.value === selectedJobId)}
            onChange={handleSelectChange}
            placeholder="-- Select Job --"
            className="w-2xl"
            styles={{
              control: (base) => ({
                ...base,
                padding: "2px",
                borderColor: "#ccc",
                borderRadius: "6px",
                fontSize: "1rem",
                minWidth: "300px",
              }),
            }}
            isClearable
          />
          <button
            onClick={handlePdfDownload}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Download Pdf
          </button>
        </div>
      </div>

      {filteredApplicants.length === 0 ? (
        <p className="text-center text-gray-600">No applicants found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredApplicants.map((applicant, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-blue-700">
                {applicant.full_name}
              </h2>
              <p className="text-sm text-gray-600">
                {applicant.email} | {applicant.phone}
              </p>
              <p className="mt-1 text-gray-700">Gender: {applicant.gender}</p>
              <p className="text-gray-700">
                Birth Date: {applicant.birth_date}
              </p>
              <p className="text-gray-700">Applied For: {applicant.job_name}</p>
              <p className="text-gray-700 mb-3">
                Workplace: {applicant.selected_work_place}
              </p>

              {/* Education */}
              <div className="mb-4">
                <h3 className="text-md font-medium text-gray-800 mb-1">
                  Education
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {applicant.educations?.map((edu, idx) => (
                    <li key={idx}>
                      {edu.education_level} — {edu.field_of_study} —{" "}
                      {edu.education_organization} — CGPA —{edu.cgpa} (
                      {edu.graduation_year})
                    </li>
                  ))}
                </ul>
              </div>

              {/* Experience */}
              <div className="mb-4">
                <h3 className="text-md font-medium text-gray-800 mb-1">
                  Experience
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {applicant.experiences?.map((exp, idx) => (
                    <li key={idx}>
                      {exp.company_name} — {exp.job_title} ({exp.from_date} -{" "}
                      {exp.to_date})
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-md font-medium text-gray-800 mb-1">
                  Certifications
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {applicant.certifications?.map((cert, idx) => (
                    <li key={idx}>
                      {cert.certificate_title} ({cert.awarded_date})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AcceptedApplicants;
