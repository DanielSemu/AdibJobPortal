import  { useEffect, useState } from "react";
import ReusableTable from "../ui/ReausableTable";
import axiosInstance from "../../api/axiosInstance";

const RejectedApplications = () => {
  const [applicants, setApplicants] = useState([]);

  
  const API_URL = "/applications/admin_applicants/?status=Rejected";

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axiosInstance.get(API_URL);
        setApplicants(res.data);
      } catch (err) {
        console.error("Failed to fetch applicants:", err);
      }
    };

    fetchApplicants();
  }, []);



  const columns = [
    { header: "Full Name", accessor: "full_name" },
    { header: "Job ", accessor: "job_name" },
    { header: "Gender", accessor: "gender" },
    {
      header: "Age",
      accessor: "genderd",
      cell: (row) => {
        const birthDate = new Date(row.birth_date);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        return age;
      },
    },
    { header: "Status", accessor: "status" },

  ];

  return (
    <div className="mx-auto py-6 px-2 bg-white shadow-lg rounded-lg mt-10">

      <ReusableTable
        columns={columns}
        records={applicants}
        // addAddress={"/categories/add"}
        title={"Rejected  Applicants"}
      />
    </div>
  );
};


export default RejectedApplications
