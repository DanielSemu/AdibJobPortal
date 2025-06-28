import { useEffect, useState } from "react";
import ReusableTable from "../ui/ReausableTable";
import { FiLock } from "react-icons/fi";
import { getExpiredJobs, updateJob } from "../services/jobsService";
import ConfirmModal from "../ui/ConfirmModal";
import { showSuccessToast } from "../../utils/toastUtils";

const CloseJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await getExpiredJobs();
      setJobs(response);
    };
    fetchJobs();
  }, []);

  const openModal = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const handleConfirmClose = async () => {
    if (!selectedJob) return;
    try {
      const updatedRow = { ...selectedJob, status: "Closed" };
      await updateJob(selectedJob.id, updatedRow);

      // Refresh the jobs list
      showSuccessToast("Job Closed Successfully!")
      const response = await getExpiredJobs();
      setJobs(response);
    } catch (error) {
      console.error("Authorization failed:", error);
    } finally {
      setModalOpen(false);
      setSelectedJob(null);
    }
  };

  const columns = [
    { header: "Job Title", accessor: "title" },
    { header: "Location", accessor: "location" },
    { header: "Type", accessor: "job_type" },
    { header: "Post Date", accessor: "post_date" },
    { header: "Deadline", accessor: "application_deadline" },
    { header: "Status", accessor: "status" },
    {
      header: "Close",
      accessor: "actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button onClick={() => openModal(row)} className="btn">
            <FiLock />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="py-6 bg-white shadow-lg rounded-lg mt-10">
      <ReusableTable columns={columns} records={jobs} title={"Close Expired Jobs"} />

      <ConfirmModal
        isOpen={modalOpen}
        message="Are you sure you want to close this job?"
        onConfirm={handleConfirmClose}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
};

export default CloseJobs;
