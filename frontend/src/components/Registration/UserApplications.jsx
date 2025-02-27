import React, { useEffect, useState } from 'react'
import { getMyApplications } from '../../api/auth'

const ApplicationCard = ({ application }) => {
  const statusColors = {
    "Pending": "bg-yellow-100 text-yellow-600",
    "Under Review": "bg-yellow-100 text-yellow-600",
    "Waitlisted": "bg-yellow-100 text-yellow-600",
    "On Hold": "bg-yellow-100 text-yellow-600",

    "Shortlisted": "bg-blue-100 text-blue-600",
    "Interview Scheduled": "bg-blue-100 text-blue-600",
    "Assessment Pending": "bg-blue-100 text-blue-600",

    "Offered": "bg-green-100 text-green-600",
    "Accepted": "bg-green-100 text-green-600",
    "Hired": "bg-green-100 text-green-600",

    "Rejected": "bg-red-100 text-red-600",
    "Withdrawn": "bg-red-100 text-red-600",

    "Background Check": "bg-purple-100 text-purple-600"
  };
  return (
    <div className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden my-4 mx-auto">
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-gray-800">{application.job_name}</h2>
        <p className="text-sm text-gray-600">{application.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Applicant: {application.full_name}</h3>
            <p className="text-sm text-gray-500">Email: {application.email}</p>
            <p className="text-sm text-gray-500">Phone: {application.phone}</p>
          </div>
          <div className="mt-4 flex justify-between items-center">
          <span
            className={`px-3 py-1 text-sm font-semibold rounded-full ${statusColors[application.status] || "bg-gray-100 text-gray-600"}`}
          >
            {application.status}
          </span>
        </div>
        </div>
      </div>
    </div>
  );
};

const UserApplications = () => {
  const [myApplications, setMyApplications] = useState([]) // ✅ Ensures it's always an array
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getMyApplications()
        
        setMyApplications(response || []) // ✅ Ensures fallback to empty array
      } catch (err) {
        setError("Failed to fetch applications")
        setMyApplications([]) // ✅ Ensures no `undefined` issues
      }
    }
    fetchApplications()
  }, [])

  return (
    <div className="main-container bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Your Applications</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myApplications.length > 0 ? (
            myApplications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))
          ) : (
            <div className="col-span-full text-center text-xl text-gray-500">
              No applications found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserApplications
