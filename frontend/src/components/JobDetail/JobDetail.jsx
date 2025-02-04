import { useState } from "react";
import { FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaRegCalendarTimes  } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { jobs } from "../../data/jobs";

const JobDetail = () => {
  const [applied, setApplied] = useState(false);
  const { id } = useParams();

  // Find the detailed job by matching the `id` with the `Jobs` array
  const detailedData = jobs.find((item) => item.id === Number(id));

  const handleApply = () => {
    setApplied(true);
    // Add logic for navigation or API request
  };
  if (!detailedData) {
    return (
      <div className="main-container flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-8">
          <p className="text-xl font-semibold text-gray-600">Job not found</p>
        </div>
      </div>
    );
  }
  return (
    <div className="main-container flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-8">
        {/* Job Title and Company */}
        {detailedData.jobTitle && (
          <h1 className="text-4xl font-bold text-gray-900">
            {detailedData.jobTitle}
          </h1>
        )}
        {detailedData.company && (
          <p className="text-lg text-gray-600 mt-2">{detailedData.company}</p>
        )}

        {/* Job Details */}
        <div className="flex flex-wrap gap-4 mt-4 text-gray-700">
          {detailedData.jobType && (
            <p className="flex items-center gap-2">
              <FaBriefcase className="text-blue-500" />{" "}
              <strong>Job Type:</strong> {detailedData.jobType}
            </p>
          )}
          {detailedData.location && (
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" />{" "}
              <strong>Location:</strong> {detailedData.location}
            </p>
          )}
          {detailedData.salary && (
            <p className="flex items-center gap-2">
              <FaMoneyBillWave className="text-green-500" />{" "}
              <strong>Salary:</strong> {detailedData.salary}
            </p>
          )}
          {detailedData.deadLine && (
            <p className="flex items-center gap-2">
              <FaRegCalendarTimes   className="text-red-500" />{" "}
              <strong>Dead Line:</strong> {detailedData.deadLine}
            </p>
          )}
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-300" />

        {/* Job Description */}
        {detailedData.description && (
          <>
            <h2 className="text-2xl font-semibold text-gray-900">
              Job Description
            </h2>
            <p className="text-gray-600 mt-3 leading-relaxed">
              {detailedData.description}
            </p>
          </>
        )}

        {/* Responsibilities */}
        {detailedData.responsibilities && (
          <>
            <h2 className="text-xl font-semibold mt-6">Key Responsibilities</h2>
            <ul className="list-disc ml-6 text-gray-600 mt-2 space-y-1">
              {detailedData.responsibilities.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          </>
        )}

        {/* Qualifications */}
        {detailedData.qualifications && (
          <>
            <h2 className="text-xl font-semibold mt-6">
              Required Qualifications
            </h2>
            <ul className="list-disc ml-6 text-gray-600 mt-2 space-y-1">
              {detailedData.qualifications.map((qual, index) => (
                <li key={index}>{qual}</li>
              ))}
            </ul>
          </>
        )}

        {/* Skills */}
        {detailedData.skills && (
          <>
            <h2 className="text-xl font-semibold mt-6">Skills & Experience</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {detailedData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-200 rounded-lg text-gray-800 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </>
        )}

        {/* Benefits */}
        {detailedData.benefits && (
          <>
            <h2 className="text-xl font-semibold mt-6">Benefits & Perks</h2>
            <ul className="list-disc ml-6 text-gray-600 mt-2 space-y-1">
              {detailedData.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </>
        )}

        {/* Application Process */}
        {detailedData.applicationProcess && (
          <>
            <h2 className="text-xl font-semibold mt-6">How to Apply</h2>
            <p className="text-gray-600 mt-2">
              {detailedData.applicationProcess}
            </p>
          </>
        )}

        {/* Apply Button */}
        <Link
          to={applied ? "#" : `/apply/${detailedData.id}`}
          className={`mt-6 w-full px-6 py-3 text-lg font-semibold text-white rounded-lg transition-all duration-300 flex items-center justify-center ${
            applied
              ? "bg-gray-400 cursor-not-allowed pointer-events-none"
              : "bg-blue-600 hover:bg-blue-700 transform hover:scale-105"
          }`}
          onClick={applied ? (e) => e.preventDefault() : handleApply}
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default JobDetail;
