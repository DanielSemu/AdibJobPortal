import React, { useState } from 'react';

const SendSMSForAccepted = () => {
  const [selectedJob, setSelectedJob] = useState('');
  const [smsText, setSmsText] = useState('');
  const [filteredApplicants, setFilteredApplicants] = useState([]);

  const applicants = [
    { id: 1, name: 'Abebe Kebede', job: 'Software Engineer', status: 'underReview', phone: '+251912345678' },
    { id: 2, name: 'Almaz Tsegaye', job: 'Data Analyst', status: 'submitted', phone: '+251911112233' },
    { id: 3, name: 'Mekdes Alemu', job: 'Software Engineer', status: 'underReview', phone: '+251923456789' },
    { id: 4, name: 'Samuel Bekele', job: 'Software Engineer', status: 'rejected', phone: '+251911223344' },
  ];

  const jobOptions = [...new Set(applicants.map(a => a.job))]; // Unique jobs

  const handleFilter = () => {
    const result = applicants.filter(app => app.job === selectedJob && app.status === 'underReview');
    setFilteredApplicants(result);
  };

  const handleSendSMS = () => {
    // Placeholder for sending logic (e.g. API request)
    alert(`SMS sent to ${filteredApplicants.length} applicant(s): "${smsText}"`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Send SMS to Applicants</h1>

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700">Select Job</label>
        <select
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
        >
          <option value="">-- Choose Job --</option>
          {jobOptions.map((job, index) => (
            <option key={index} value={job}>{job}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700">Common SMS Text</label>
        <textarea
          rows="4"
          value={smsText}
          onChange={(e) => setSmsText(e.target.value)}
          placeholder="Type your SMS here..."
          className="w-full border border-gray-300 rounded px-4 py-2"
        ></textarea>
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
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Applicants to Receive SMS:</h2>
          <ul className="space-y-2">
            {filteredApplicants.map((applicant) => (
              <li key={applicant.id} className="p-3 border rounded bg-gray-50">
                <span className="font-medium">{applicant.name}</span> — {applicant.phone}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SendSMSForAccepted;
