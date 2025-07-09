/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getApplicantsByCriteria } from "../services/jobsService";
import axiosInstance from "../../api/axiosInstance";
import ConfirmModal from "../ui/ConfirmModal";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import CriteriaCard from "./SelectedApplicant/CriteriaCard";
import MessageModal from "./SelectedApplicant/MessageModal";

const SelectedApplicants = ({ selectedJobId, refreshKey }) => {
  const [criterias, setCriterias] = useState([]);
  const [expandedCriteriaId, setExpandedCriteriaId] = useState(null);
  const [applicantsByCriteria, setApplicantsByCriteria] = useState({});
  const [applicantsLoading, setApplicantsLoading] = useState(false);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [criteriaToRevert, setCriteriaToRevert] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedCriteriaId, setSelectedCriteriaId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCriterias();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedJobId, refreshKey]);

  const fetchCriterias = async () => {
    try {
      const res = await axiosInstance.get("/applications/criterias/");
      const filtered = res.data.filter((c) => c.job === selectedJobId);
      setCriterias(filtered);
    } catch (error) {
      console.error("Error fetching criterias:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplicants = async (criteriaId) => {
    setApplicantsLoading(true);
    try {
      const response = await getApplicantsByCriteria(criteriaId);
      setApplicantsByCriteria((prev) => ({
        ...prev,
        [criteriaId]: response,
      }));
      setExpandedCriteriaId(criteriaId);
    } catch (error) {
      console.error("Error fetching applicants:", error);
      showErrorToast("Failed to fetch applicants.");
    } finally {
      setApplicantsLoading(false);
    }
  };
  const totalSelectedApplicants = criterias.reduce(
    (total, c) => total + (c.matched_applicants || 0),
    0
  );

  const openMessageModal = (criteriaId) => {
    setSelectedCriteriaId(criteriaId);
    setShowModal(true);
  };

  const sendMessageToBackend = async (messageType) => {
    const isTest = messageType === "test";
    try {
      const response = await axiosInstance.post("/applications/send-sms/", {
        selectedCriteria: selectedCriteriaId,
        message,
        testMessage: isTest,
      });

      const count = response?.data?.results?.length || 0;
      showSuccessToast(
        isTest
          ? `Test message sent. Total: ${count}`
          : `Message sent to ${count} applicant(s).`
      );
      fetchCriterias()
      if (!isTest) {
        setShowModal(false);
        setMessage("");
      }
    } catch (error) {
      showErrorToast(
        error?.response?.data?.error ||
          "❌ Something went wrong while sending the message."
      );
    }
  };

  const revertCriteriaSelection = (id) => {
    setCriteriaToRevert(id);
    setIsConfirmOpen(true);
  };

  const confirmRevert = async () => {
    try {
      await axiosInstance.put(
        `/applications/revert_filter_applicants/${criteriaToRevert}/`
      );
      showSuccessToast("Criteria has been reverted.");
      setIsConfirmOpen(false);
      setCriteriaToRevert(null);
      fetchCriterias();
    } catch {
      showErrorToast("Failed to revert criteria.");
      setIsConfirmOpen(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading criterias...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Selected Applicant Criterias
      </h2>

      <div className="max-h-[100vh] overflow-auto grid grid-cols-1 gap-6">
        {criterias.map((criteria) => (
          <CriteriaCard
            key={criteria.id}
            criteria={criteria}
            isExpanded={expandedCriteriaId === criteria.id}
            applicants={applicantsByCriteria[criteria.id]}
            loading={applicantsLoading}
            fetchApplicants={fetchApplicants}
            openMessageModal={openMessageModal}
            revertCriteriaSelection={revertCriteriaSelection}
            setExpandedCriteriaId={setExpandedCriteriaId}
          />
        ))}
      </div>
      <div className="text-center font-semibold text-lg mt-4">
        Total Selected Applicants :{" "}
        <span className="text-primary">{totalSelectedApplicants}</span>
      </div>

      {showModal && (
        <MessageModal
          message={message}
          setMessage={setMessage}
          onClose={() => setShowModal(false)}
          onSend={() => sendMessageToBackend("notTest")}
          onTest={() => sendMessageToBackend("test")}
        />
      )}

      <ConfirmModal
        isOpen={isConfirmOpen}
        message="Are you sure you want to revert this criteria?"
        onConfirm={confirmRevert}
        onCancel={() => {
          setIsConfirmOpen(false);
          setCriteriaToRevert(null);
        }}
      />
    </div>
  );
};

export default SelectedApplicants;
