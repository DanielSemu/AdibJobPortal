import { useEffect, useState } from "react";
import ReusableTable from "../ui/ReausableTable";
import ConfirmModal from "../ui/ConfirmModal";
import { FiEye, FiEdit, FiLock, FiPlus } from "react-icons/fi";
import { getJobs, updateJob } from "../services/jobsService";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { showSuccessToast } from "../../utils/toastUtils";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();
  const { userProfile } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await getJobs();
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

  const openAuthorizationModal = (row) => {
    setSelectedJob(row);
    setModalOpen(true);
  };

  const handleConfirmAuthorization = async () => {
    if (!selectedJob) return;
    try {
      const updatedRow = { ...selectedJob, status: "Active" };
      await updateJob(selectedJob.id, updatedRow);
      showSuccessToast("Authorized Successfully")
      const response = await getJobs();
      setJobs(response);
    } catch (error) {
      console.error("Authorization failed:", error);
    } finally {
      setModalOpen(false);
      setSelectedJob(null);
    }
  };

  const allowedRoles = ["hr_checker"];
  const columns = [
    { header: "Vacancy No", accessor: "vacancy_number" },
    { header: "Job Title", accessor: "title" },
    { header: "Location", accessor: "location" },
    { header: "Type", accessor: "job_type" },
    { header: "Post Date", accessor: "post_date" },
    { header: "Deadline", accessor: "application_deadline" },
    { header: "Status", accessor: "status" },

    ...(allowedRoles.includes(userProfile.role)
      ? [
          {
            header: "Authorize",
            accessor: "authorize",
            cell: (row) => (
              <div className="flex gap-2">
                {row.status === "Draft" && (
                  <button
                    title="Authorize and Post Job"
                    onClick={() => openAuthorizationModal(row)}
                    className="btn text-red-500 text-xl"
                  >
                    <FiLock />
                  </button>
                )}
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
    <div className=" mx-auto py-6 bg-white shadow-lg rounded-lg mt-10">
      {userProfile.role === "hr_maker" && (
        <div className="flex justify-between items-center">
          <Link
            to={"/jobs/add"}
            className="btn bg-primary text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FiPlus /> Add Job
          </Link>
        </div>
      )}

      <ReusableTable columns={columns} records={jobs} title="Jobs" />

      {/* Modal confirmation */}
      <ConfirmModal
        isOpen={modalOpen}
        message="Are you sure you want to authorize and post this Job?"
        onConfirm={handleConfirmAuthorization}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Jobs;
