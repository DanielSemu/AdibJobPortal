import React, { useEffect, useState } from "react";
import ReusableTable from "../ui/ReausableTable";
import { FiEye, FiEdit, FiLock, FiPlus } from "react-icons/fi";
import { getJobs, updateJob } from "../services/jobsService";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const { userProfile, setUserProfile } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await getJobs();
      console.log();
      setJobs(response);
    };
    fetchJobs();
  }, []);

  const handleEdit = (row) => {
    navigate(`/edit/${row.id}`);
  };
  const handleDetailView = (row) => {
    navigate(`/detail/${row.id}`);
  };
  const handleAuthorization = async (row) => {
    const confirmed = window.confirm(
      "Are you sure you want to authorize and post this Job?"
    );
    if (confirmed) {
      try {
        const updatedRow = { ...row, status: "Active" };
        await updateJob(row.id, updatedRow);

        // Refresh the jobs list
        const response = await getJobs();
        setJobs(response);
      } catch (error) {
        console.error("Authorization failed:", error);
      }
    } else {
      console.log("Authorization cancelled");
    }
  };

  const allowedRoles = ["hr_checker"];
  const columns = [
    { header: "Job Title", accessor: "title" },
    { header: "Location", accessor: "location" },
    { header: "Type", accessor: "job_type" },
    { header: "Deadline", accessor: "application_deadline" },
    { header: "Status", accessor: "status" },

    // Conditionally add the Authorize column
    ...(allowedRoles.includes(userProfile.role)
      ? [
          {
            header: "Authorize",
            accessor: "authorize",
            cell: (row) => (
              <div className="flex gap-2">
                {row.status === "InActive" ? (
                  <button
                    title="Authorize and Post Job"
                    onClick={() => handleAuthorization(row)}
                    className="btn text-red-500 text-xl"
                  >
                    <FiLock />
                  </button>
                ) : null}
              </div>
            ),
          },
        ]
      : []),

    {
      header: "Actions",
      accessor: "actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button onClick={() => handleDetailView(row)} className="btn">
            <FiEye />
          </button>
          {userProfile.role === "hr_maker" && (
            <button onClick={() => handleEdit(row)} className="btn">
              <FiEdit />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      {userProfile.role == "hr_maker" && (
        <div className="flex justify-between items-center mb-4">
          <Link
            to={"/jobs/add"}
            onClick={""}
            className="btn bg-primary text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FiPlus /> Add job
          </Link>
        </div>
      )}

      <ReusableTable
        columns={columns}
        records={jobs}
        // addAddress={"/jobs/add"}
        title={"Jobs"}
      />
    </div>
  );
};

export default Jobs;
