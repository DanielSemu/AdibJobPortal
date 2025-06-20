import { useEffect, useState } from "react";
import ReusableTable from "../ui/ReausableTable";
import { FiCheck } from "react-icons/fi";
import { useNavigate} from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const VerifyApplicants = () => {
  const [applicants, setApplicants] = useState([]);

  const navigate = useNavigate();

  const API_URL = "/applications/admin_applicants/?status=SMS_Sent";

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

  const handleDetailView = (row) => {
    navigate(`/authorize_document/${row.id}`);
  };

  const columns = [
    //   { header: "name", accessor: "name", cell:()=>("yyyy-xxxx-jjjj") },
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
    <div className="mx-auto py-6 px-2 bg-white shadow-lg rounded-lg mt-10">
    

      <ReusableTable
        columns={columns}
        records={applicants}
        // addAddress={"/categories/add"}
        title={"Verify  Applicants Document"}
      />
    </div>
  );
};

export default VerifyApplicants;
