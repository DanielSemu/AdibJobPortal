import React, { useEffect, useState } from "react";
import ReusableTable from "../ui/ReausableTable";
import { FiCheck } from "react-icons/fi";
import { useNavigate,Link } from "react-router-dom";
import { getApplications } from '../services/jobsService';


const Applications = () => {
    const [applicants,setApplicants]=useState([])


    const navigate = useNavigate();

    useEffect(()=>{
        const fetchCategories =async()=>{
            const response=await getApplications()
            setApplicants(response)
        }
        fetchCategories()
    },[])

    const handleDetailView = (row) => {
      navigate(`/authorize_document/${row.id}`);
    };

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
           header: "Verify",
           accessor: "actions",
           cell: (row) => (
             <div className="flex gap-2">
               <button onClick={() => handleDetailView(row)} className="btn">
                 <FiCheck />
               </button>
             </div>
           ),
         },
      

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
      
    </div>
  )
}

export default Applications