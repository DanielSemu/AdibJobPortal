  import React, { useEffect, useState } from "react";
  import ReusableTable from "../ui/ReausableTable";
  import { FiEye, FiEdit } from "react-icons/fi";
  import { getJobs } from "../services/jobsService";
  import { useNavigate } from "react-router-dom";


  const Jobs = () => {
    const [jobs, setJobs]=useState([])
    const navigate=useNavigate()

    useEffect(()=>{
      const fetchJobs=async()=>{
        const response=await getJobs()
        console.log();
        setJobs(response)
      }
      fetchJobs()
    },[])

      const handleEdit=(row)=>{
        navigate(`/edit/${row.id}`)
      }
      const handleDetailView = (row) => {
          navigate(`/detail/${row.id}`)
        };

      const columns = [
          { header: "job Title", accessor: "title" },
          { header: "Location", accessor: "location" },
          { header: "Type", accessor: "type" },
          { header: "DeadLine", accessor: "application_deadline" },
          { header: "Status", accessor: "status" },
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

