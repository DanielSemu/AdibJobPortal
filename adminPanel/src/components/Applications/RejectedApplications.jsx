import { useEffect, useState } from "react";
import ReusableTable from "../ui/ReausableTable";
import axiosInstance from "../../api/axiosInstance";
import { FaEye } from "react-icons/fa";

const RejectedApplications = () => {
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  const handleView = (applicant) => {
    setSelectedApplicant(applicant);
    setModalOpen(true);
  };

  const columns = [
    { header: "Full Name", accessor: "full_name" },
    { header: "Job", accessor: "job_name" },
    { header: "Gender", accessor: "gender" },
    {
      header: "Age",
      accessor: "birth_date",
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
    { header: "Remark", accessor: "remark" },
    {
      header: "Actions",
      cell: (row) => (
        <button
          onClick={() => handleView(row)}
          className="text-blue-600 hover:text-blue-800"
        >
          <FaEye />
        </button>
      ),
    },
  ];

  return (
    <div className="mx-auto py-6 px-2 bg-white shadow-lg rounded-lg mt-10">
      <ReusableTable
        columns={columns}
        records={applicants}
        title={"Rejected Applicants"}
      />

      {/* Modal for Viewing Details */}
      {modalOpen && selectedApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Applicant Details</h2>
            <p><strong>Full Name:</strong> {selectedApplicant.full_name}</p>
            <p><strong>Job:</strong> {selectedApplicant.job_name}</p>
            <p><strong>Gender:</strong> {selectedApplicant.gender}</p>
            <p><strong>Birth Date:</strong> {selectedApplicant.birth_date}</p>
            <p><strong>Status:</strong> {selectedApplicant.status}</p>
            <p><strong>Remark:</strong> {selectedApplicant.remark}</p>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RejectedApplications;
