import { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaRegCalendarTimes,
  FaRegCalendarCheck,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getSingleJob } from "../services/jobsService";

const JobDetail = () => {
  // const [applied, setApplied] = useState(false);
  const { id } = useParams();
  const [detailedData, setDetailedData] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getSingleJob(parseInt(id));
        setDetailedData(response);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    fetchJob();
  }, [id]);

  // const handleApply = () => {
  //   setApplied(true);
  // };

  if (!detailedData) {
    return <div>Loading...</div>;
  }

  // Group details by detail_type
  const groupedDetails = detailedData.details?.reduce((acc, detail) => {
    if (!acc[detail.detail_type]) {
      acc[detail.detail_type] = [];
    }
    acc[detail.detail_type].push(detail.description);
    return acc;
  }, {});

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div>
        {/* Job Title and Company */}
        {detailedData.title && (
          <h1 className="text-4xl font-bold text-gray-900">{detailedData.title} Grade {detailedData.job_grade}</h1>
        )}
        {detailedData.company && (
          <p className="text-lg text-gray-600 mt-2">{detailedData.company}</p>
        )}

        {/* Job Details */}
        <div className="flex flex-wrap gap-4 mt-4 text-gray-700">
          {detailedData.vacancy_number && (
            <p className="flex items-center gap-2">
              <FaBriefcase className="text-blue-500" /> <strong>Vacancy Number:</strong> {detailedData.vacancy_number}
            </p>
          )}          
          {detailedData.job_type && (
            <p className="flex items-center gap-2">
              <FaBriefcase className="text-blue-500" /> <strong>Job Type:</strong> {detailedData.job_type}
            </p>
          )}          
          {detailedData.location && (
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" /> <strong>Location:</strong> {detailedData.location}
            </p>
          )}
          {detailedData.salary && (
            <p className="flex items-center gap-2">
              <FaMoneyBillWave className="text-green-500" /> <strong>Salary:</strong> {detailedData.salary}
            </p>
          )}
          {detailedData.post_date && (
            <p className="flex items-center gap-2">
              <FaRegCalendarCheck className="text-green-500" /> <strong>Post Date:</strong> {detailedData.post_date}
            </p>
          )}
          {detailedData.application_deadline && (
            <p className="flex items-center gap-2">
              <FaRegCalendarTimes className="text-red-500" /> <strong>Deadline:</strong> {detailedData.application_deadline}
            </p>
          )}
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-300" />

        {/* Job Description */}
        {detailedData.description && (
          <>
            <h2 className="text-2xl font-semibold text-gray-900">Job Description</h2>
            <p className="text-gray-600 mt-3 leading-relaxed">{detailedData.description}</p>
          </>
        )}

        {/* Grouped Job Details (Responsibility, Skill, Benefits) */}
        {groupedDetails && (
  <>
    {Object.entries(groupedDetails).map(([type, descriptions]) => (
      <div key={type}>
        <h2 className="text-xl font-semibold mt-6">
          {type === "Responsibility"
            ? "Key Responsibilities"
            : type === "Qualification"
            ? "Qualification"
            : type === "Skill"
            ? "Key Skills"
            : type === "Benefits"
            ? "Job Benefits"
            : type}
        </h2>
        
        {/* Render list for Responsibility & Qualification */}
        {(type === "Responsibility" || type === "Qualification") ? (
          <ul className="list-disc ml-6 text-gray-600 mt-2 space-y-1">
            {descriptions.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
        ) : (
          /* Render badge-like div for Skill & Benefits */
          <div className="flex flex-wrap gap-2 mt-2">
            {descriptions.map((desc, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 rounded-lg text-gray-800 text-sm"
              >
                {desc}
              </span>
            ))}
          </div>
        )}
      </div>
    ))}
  </>
)}


        {/* Application Process */}
        {detailedData.how_to_apply && (
          <>
            <h2 className="text-xl font-semibold mt-6">How to Apply</h2>
            <p className="text-gray-600 mt-2">{detailedData.how_to_apply}</p>
          </>
        )}

    
      </div>
    </div>
  );
};

export default JobDetail;

