import { useEffect, useState } from "react";
import { getActiveJobs, getApplicantsByJob } from "../services/jobsService";

const ActiveJobs = () => {
  const [activeJobs, setActiveJobs] = useState([]);
  const [applicantCounts, setApplicantCounts] = useState({});

  const fetchActiveJobs = async () => {
    try {
      
      const response = await getActiveJobs();
      if (Array.isArray(response)) {
        const active = response.filter((item) => item.status === "Active");
        setActiveJobs(active);

        // Fetch applicant counts per job
        const counts = {};
        await Promise.all(
          active.map(async (job) => {
            
            const genderData = await getApplicantsByJob(job.id);
            
            const maleCount = genderData.filter(
                (applicant) => applicant.gender?.trim().toLowerCase() === "m"
              ).length;
              
              const femaleCount = genderData.filter(
                (applicant) => applicant.gender?.trim().toLowerCase() === "f"
              ).length;
              
              counts[job.id] = {
                Male: maleCount,
                Female: femaleCount,
              };
              
          })
        );
        setApplicantCounts(counts);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  useEffect(() => {
    fetchActiveJobs();
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Active Jobs</h1>
      {activeJobs.length === 0 ? (
        <p className="text-center text-gray-600">No active jobs found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeJobs.map((job) => {
            const count = applicantCounts[job.id] || { Male: 0, Female: 0 };
            const total = count.Male + count.Female;

            return (
              <div
                key={job.id}
                className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-blue-700 mb-2">
                  {job.title} Grade {job.job_grade}
                </h2>
                <p className="text-gray-700 mb-1">
                  <strong>Total Applicants:</strong> {total}
                </p>
                <div className="text-sm text-gray-600 mt-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    Male: {count.Male}
                  </span>
                  <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full">
                    Female: {count.Female}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ActiveJobs;
