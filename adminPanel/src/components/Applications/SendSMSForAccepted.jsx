import React, { useEffect, useState } from "react";
import { getUnderReviewApplicants } from "../services/jobsService";

const SendSMSForAccepted = () => {
  const [selectedJob, setSelectedJob] = useState("");
  const [smsText, setSmsText] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [testNumber, setTestNumber] = useState([]);
  useEffect(() => {
    const fetchApplicants = async () => {
      const response = await getUnderReviewApplicants();
      setApplicants(response);
    };
    fetchApplicants();
  }, []);

  const jobOptions = [...new Set(applicants.map((a) => a.job_name))]; // Unique jobs

  const handleFilter = () => {
    const result = applicants.filter(
      (app) => app.job_name === selectedJob && app.status === "Under Review"
    );
    setFilteredApplicants(result);
  };

  const handleTestSMS = () => {
    console.log(smsText);
    
    console.log(testNumber);
  };

  const handleSendSMS = () => {
    // Placeholder for sending logic (e.g. API request)

    alert(
      `SMS sent to ${filteredApplicants.length} applicant(s): "${smsText}"`
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Send SMS to Applicants
      </h1>

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700">
          Select Job
        </label>
        <select
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
        >
          <option value="">-- Choose Job --</option>
          {jobOptions.map((job, index) => (
            <option key={index} value={job}>
              {job}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700">
          Common SMS Text
        </label>
        <textarea
          rows="4"
          value={smsText}
          onChange={(e) => setSmsText(e.target.value)}
          placeholder="Type your SMS here..."
          className="w-full border border-gray-300 rounded px-4 py-2"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700">Insert Test Phone Number</label>
        <input
          className="border border-gray-300 rounded px-4 py-2 mr-2"
          type="text"
          placeholder="Insert Test Phone Number"
          value={testNumber}
          onChange={(e) => setTestNumber(e.target.value)}
        />
        <button
          onClick={handleTestSMS}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Test SMS
        </button>
      </div>
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Filter Applicants
        </button>

        <button
          onClick={handleSendSMS}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          disabled={filteredApplicants.length === 0 || !smsText}
        >
          Send SMS
        </button>
      </div>

      {filteredApplicants.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Applicants to Receive SMS:
          </h2>
          <ul className="space-y-2">
            {filteredApplicants.map((applicant) => (
              <li key={applicant.id} className="p-3 border rounded bg-gray-50">
                <span className="font-medium">{applicant.full_name}</span> —{" "}
                {applicant.phone}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SendSMSForAccepted;
