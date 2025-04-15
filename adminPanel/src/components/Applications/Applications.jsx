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
         const columns = [
    //   { header: "name", accessor: "name", cell:()=>("yyyy-xxxx-jjjj") },
      { header: "Full Name", accessor: "full_name" },
      { header: "Job ", accessor: "job_name" },
      { header: "Gender", accessor: "gender" },
      { header: "Age", accessor: "genderd",
        cell:(row)=>{
          const birthDate=new Date(row.birth_date)
          const today=new Date()
          let age =today.getFullYear() - birthDate.getFullYear()
          const monthDiff= today.getMonth() -birthDate.getMonth()
          if(monthDiff <0 ||(monthDiff === 0 && today.getDate() < birthDate.getDate())){
            age--
          }
          return age
        }
       },
      { header: "Status", accessor: "status" },
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
      { header: "Check Document", accessor: "Report" },

    ];

  return (
    <div>
      <Link to={'/filter_applicants'} className=" bg-blue-700 text-white py-1 px-3  flex w-fit rounded-md hover:bg-blue-500 transition-all ">Filter Applicants</Link>
      <ReusableTable
        columns={columns}
        records={applicants}
        // addAddress={"/categories/add"}
        title={"Applicants"}
      />
      
      {isModalOpen && selectedResume && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg w-4/5 h-full relative">
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