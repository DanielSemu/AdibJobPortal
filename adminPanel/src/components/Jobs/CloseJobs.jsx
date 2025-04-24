import React, { useEffect, useState } from "react";
import ReusableTable from "../ui/ReausableTable";
import { FiLock } from "react-icons/fi";
import { getExpiredJobs, updateJob } from "../services/jobsService";
import { useNavigate } from "react-router-dom";

const CloseJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await getExpiredJobs();
      console.log();
      setJobs(response);
    };
    fetchJobs();
  }, []);


  const handleAuthorization = async (row) => {
    const confirmed = window.confirm("Are you sure you want to Close this Job?");
    if (confirmed) {
      try {
        const updatedRow = { ...row, status: "Closed" };
        await updateJob(row.id, updatedRow);
        
        // Refresh the jobs list
        const response = await getExpiredJobs();
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
      header: "Close",
      accessor: "actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button onClick={() => handleAuthorization(row)} className="btn">
            <FiLock />
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
        // addAddress={"/jobs/add"}
        title={"Close Expired Jobs"}
      />
    </div>
  );
};


export default CloseJobs