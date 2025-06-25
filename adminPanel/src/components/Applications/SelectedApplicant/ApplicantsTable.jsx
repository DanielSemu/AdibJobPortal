import { useState } from "react";
import { differenceInMonths, parseISO } from "date-fns";
import RemoveModal from "./RemoveModal";
import { showSuccessToast, showErrorToast } from "../../../utils/toastUtils"; // optional
import { removeApplicant } from "../../services/jobsService";

const ApplicantsTable = ({ applicants = [], loading }) => {
  const [applicantList, setApplicantList] = useState(applicants);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);
  const [remark, setRemark] = useState("");

  const handleRemoveClick = (id) => {
    setSelectedApplicantId(id);
    setModalOpen(true);
  };
  // there is update on
  const handleConfirmRemove = async () => {
    if (remark !== "") {
      try {
        await removeApplicant(selectedApplicantId, remark);

        // ✅ Update local applicant list
        setApplicantList((prevList) =>
          prevList.filter((app) => app.id !== selectedApplicantId)
        );

        showSuccessToast("Applicant removed successfully");
        setModalOpen(false);
        setRemark("");
      } catch (error) {
        console.error("Removal failed", error);
        showErrorToast("Failed to remove applicant");
      }
    } else {
      showErrorToast("You Must add a remark to remove an applicant");
    }
  };

  const calculateExperience = (experiences = []) => {
    let totalMonths = 0;
    experiences.forEach((exp) => {
      if (exp.from_date && exp.to_date) {
        const from = parseISO(exp.from_date);
        const to = parseISO(exp.to_date);
        const diff = differenceInMonths(to, from);
        totalMonths += diff > 0 ? diff : 0;
      }
    });

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    return `${years} yr${years !== 1 ? "s" : ""} ${months} mo${
      months !== 1 ? "s" : ""
    }`;
  };

  if (loading)
    return <p className="text-gray-500 text-sm">Loading applicants...</p>;
  if (!applicantList.length)
    return <p className="text-gray-500 text-sm">No applicants found.</p>;

  return (
    <div className="mt-2 max-h-64 overflow-auto border-t pt-2 relative">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            <th className="border px-2 py-1 text-left">Name</th>
            <th className="border px-2 py-1 text-left">Gender</th>
            <th className="border px-2 py-1 text-left">Phone</th>
            <th className="border px-2 py-1 text-left">status</th>
            <th className="border px-2 py-1 text-left">Education</th>
            <th className="border px-2 py-1 text-left">CGPA</th>
            <th className="border px-2 py-1 text-left">Exit Exam</th>
            <th className="border px-2 py-1 text-left">Experience</th>
            <th className="border px-2 py-1 text-left">Remove</th>
          </tr>
        </thead>
        <tbody>
          {applicantList.map((app, index) => {
            const selectedEdu = app.educations?.find(
              (edu) => edu.user_for_application
            );
            const totalExperience = calculateExperience(app.experiences);

            return (
              <tr key={index}>
                <td className="border px-2 py-1">{app.full_name}</td>
                <td className="border px-2 py-1">{app.gender}</td>
                <td className="border px-2 py-1">{app.phone}</td>
                <td className="border px-2 py-1">{app.status}</td>
                <td className="border px-2 py-1">
                  {selectedEdu
                    ? `${selectedEdu.field_of_study} (${selectedEdu.education_level})`
                    : "-"}
                </td>
                <td className="border px-2 py-1">{selectedEdu?.cgpa ?? "-"}</td>
                <td className="border px-2 py-1">
                  {selectedEdu?.exit_exam ?? "-"}
                </td>
                <td className="border px-2 py-1">{totalExperience}</td>
                <td className="border px-2 py-1">
                  <button
                    onClick={() => handleRemoveClick(app.id)}
                    className="text-red-500 hover:underline"
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <RemoveModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmRemove}
        remark={remark}
        setRemark={setRemark}
      />
    </div>
  );
};

export default ApplicantsTable;
