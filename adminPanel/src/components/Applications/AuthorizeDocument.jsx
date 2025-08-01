import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getSingleApplicant,
  removeApplicant,
  updateApplicantStatus,
} from "../services/jobsService";
import { BASE_URL } from "../../api/axiosInstance";
import ConfirmModal from "../ui/ConfirmModal";
import { showErrorToast,showSuccessToast } from "../../utils/toastUtils";
import RemoveModal from "./SelectedApplicant/RemoveModal";


const AuthorizeDocument = () => {
  const { id } = useParams();
  const [applicant, setApplicant] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);
  const [remark, setRemark] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicant = async () => {
      const response = await getSingleApplicant(id);
      setApplicant(response);
    };
    fetchApplicant();
  }, [id]);

  const calculateAge = (birthDate) => {
    if (!birthDate) return "";
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleConfirm = async () => {
    if (!pendingStatus) return;
    try {
      await updateApplicantStatus(id, pendingStatus);
      navigate("/verify_applicants");
    } catch (error) {
      console.error("Failed to update status", error);
    } finally {
      setIsModalOpen(false);
      setPendingStatus(null);
    }
  };

  const openConfirmModal = (status) => {
    setPendingStatus(status);
    setIsModalOpen(true);
  };
  const openRejectModal=()=>{
    setIsRemoveModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setPendingStatus(null);
    setIsRemoveModalOpen(false)
  };

  const handleConfirmRemove = async () => {
      if (remark !== "") {
        try {
          await removeApplicant(id, remark);
  
          // ✅ Update local applicant list
          navigate('/verify_applicants')
  
          showSuccessToast("Applicant removed successfully");
          setIsRemoveModalOpen(false);
          setRemark("");
        } catch (error) {
          console.error("Removal failed", error);
          showErrorToast("Failed to remove applicant");
        }
      } else {
        showErrorToast("You Must add a remark to remove an applicant");
      }
    };
  

  return (
    <div className="w-full px-4 md:px-10 py-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-primary text-center">
        Authorize Document
      </h2>

      {applicant && applicant.id ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Personal Details */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200 col-span-1 md:col-span-2">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Personal Info
            </h3>

            <div className="flex  gap-1">
              <p className="font-bold">Applied For Job:</p>
              <p> {applicant.job_name}</p>
            </div>
            <div className="flex gap-11">
              <p className="font-bold">Full Name:</p>
              <p> {applicant.full_name}</p>
            </div>
            <div className="flex gap-[75px]">
              <p className="font-bold">Status:</p>
              <p> {applicant.status}</p>
            </div>
            <div className="flex gap-4">
              <p className="font-bold">Email Address:</p>
              <p> {applicant.email}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold">Phone Number:</p>
              <p> {applicant.phone}</p>
            </div>
            <div className="flex gap-16">
              <p className="font-bold">Gender:</p>
              <p> {applicant.gender}</p>
            </div>
            <div className="flex gap-[90px]">
              <p className="font-bold">Age:</p>
              <p> {calculateAge(applicant.birth_date)}</p>
            </div>
          </div>

          {/* Resume PDF Viewer - Full Width */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200 col-span-1 md:col-span-2">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Resume</h3>
            {applicant.resume ? (
              <iframe
                src={`${BASE_URL}${applicant.resume}`}
                className="w-full h-[80vh]"
                frameBorder="0"
                title="Resume Viewer"
              ></iframe>
            ) : (
              <p>No resume uploaded.</p>
            )}
          </div>

          {/* Education Backgrounds */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200 col-span-1 md:col-span-2 w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Education Backgrounds
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {applicant.educations?.map((education, index) => (
                <div key={index} className="border p-4 rounded-md bg-gray-50">
                  <p>
                    <strong>Level:</strong> {education.education_level}
                  </p>
                  <p>
                    <strong>Field:</strong> {education.field_of_study}
                  </p>
                  <p>
                    <strong>Organization:</strong>{" "}
                    {education.education_organization}
                  </p>
                  <p>
                    <strong>Year:</strong> {education.graduation_year}
                  </p>
                  <p>
                    <strong>CGPA:</strong> {education.cgpa}
                  </p>
                  <p>
                    <strong>Exit Exam:</strong> {education.exit_exam}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200 col-span-1 md:col-span-2 w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Experience
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {applicant.experiences?.map((experience, index) => (
                <div key={index} className="border p-4 rounded-md bg-gray-50">
                  <p>
                    <strong>Title:</strong> {experience.job_title}
                  </p>
                  <p>
                    <strong>Company:</strong> {experience.company_name}
                  </p>
                  <p>
                    <strong>From:</strong> {experience.from_date}
                  </p>
                  <p>
                    <strong>To:</strong> {experience.to_date}
                  </p>
                  {experience.banking_experience && (
                    <p>
                      <strong>Worked at Banking Industry</strong>{" "}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200 col-span-1 md:col-span-2 w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Certifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {applicant.certifications?.map((cert, index) => (
                <div key={index} className="border p-4 rounded-md bg-gray-50">
                  <p>
                    <strong>Title:</strong> {cert.certificate_title}
                  </p>
                  <p>
                    <strong>Issued By:</strong> {cert.awarding_company}
                  </p>
                  <p>
                    <strong>Date:</strong> {cert.awarded_date}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Button Group */}
          <div className="mt-10 flex gap-6 justify-center">
            <button
              onClick={() => openConfirmModal("Accepted")}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Authorize
            </button>
            <button
              onClick={() => openRejectModal()}
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition"
            >
              Reject
            </button>
          </div>
          <ConfirmModal
            isOpen={isModalOpen}
            message={`Are you sure you want to ${pendingStatus?.toLowerCase()} this applicant?`}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
          
          <RemoveModal
            isOpen={isRemoveModalOpen}
            onClose={() => setIsRemoveModalOpen(false)}
            onConfirm={handleConfirmRemove}
            remark={remark}
            setRemark={setRemark}
          />
        </div>
      ) : (
        <p className="text-red-600 font-semibold text-center mt-10">
          No data provided.
        </p>
      )}
    </div>
  );
};

export default AuthorizeDocument;
