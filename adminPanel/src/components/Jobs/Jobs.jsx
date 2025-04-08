import React, { useEffect, useState } from "react";
import ReusableTable from "../ui/ReausableTable";
import { FiEye, FiEdit,FiLock } from "react-icons/fi";
import { getJobs, updateJob } from "../services/jobsService";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

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
    const confirmed = window.confirm("Are you sure you want to authorize and post this Job?");
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
  
  
  const columns = [
    { header: "job Title", accessor: "title" },
    { header: "Location", accessor: "location" },
    { header: "Type", accessor: "job_type" },
    { header: "DeadLine", accessor: "application_deadline" },
    { header: "Status", accessor: "status" },
    {
      header: "Authorize",
      accessor: "actions",
      cell: (row) => (
        <div className="flex gap-2">
          {row.status === "InActive" ? (
            <button title="Authorize and Post Job" onClick={() => handleAuthorization(row)} className="btn text-red-500 text-xl">
            <FiLock />
          </button>
          ) : (
            ""
          )}
        </div>
      ),
    },
    {
      header: "Actions",
      accessor: "actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button onClick={() => handleDetailView(row)} className="btn">
            <FiEye />
          </button>
          <button onClick={() => handleEdit(row)} className="btn">
            <FiEdit />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <ReusableTable
        columns={columns}
        records={jobs}
        addAddress={"/jobs/add"}
        title={"Jobs"}
      />
    </div>
  );
};

export default Jobs;
