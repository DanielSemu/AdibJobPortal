import React, { useEffect, useState } from "react";
import ReusableTable from "../ui/ReausableTable";
import { FiEye, FiEdit,FiLock } from "react-icons/fi";
import { useNavigate,Link } from "react-router-dom";
import { getApplications } from '../services/jobsService';


const Applications = () => {
    const [applicants,setApplicants]=useState([])
    const [selectedResume, setSelectedResume] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        const fetchCategories =async()=>{
            const response=await getApplications()
            setApplicants(response)
        }
        fetchCategories()
    },[])
    const handleEdit = (row) => {
        navigate(`edit/${row.id}`);
      };
      const handleDetailView = (row) => {
        // console.log(selectedResume);
        navigate(`detail/${row.id}`);
      };


      
        const columns = [
        //   { header: "name", accessor: "name", cell:()=>("yyyy-xxxx-jjjj") },
          { header: "full_name", accessor: "full_name" },
          { header: "job_name", accessor: "job_name" },
          { header: "gender", accessor: "gender" },
          { header: "status", accessor: "status" },
          {
            header: "Resume",
            accessor: "resume",
            cell: (row) => (
              row.resume ? (
                <button
                  onClick={() => {
                    setSelectedResume(row.resume);
                    setIsModalOpen(true);
                  }}
                  className="text-blue-500 underline"
                >
                  View Resume
                </button>
              ) : (
                <span className="text-gray-400">No Resume</span>
              )
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
        records={applicants}
        // addAddress={"/categories/add"}
        title={"Applicants"}
      />
      {isModalOpen && selectedResume && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-4 rounded-lg w-3/4 h-3/4 relative">
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-2 right-2 text-red-500"
      >
        ✖️
      </button>
      <iframe
        src={`http://192.168.2.32:8000${selectedResume}`}
        className="w-full h-full"
        frameBorder="0"
        title="Resume Viewer"
      ></iframe>
    </div>
  </div>
)}

    </div>
  )
}

export default Applications