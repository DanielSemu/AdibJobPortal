/* eslint-disable react/prop-types */
import { format } from "date-fns";
import ApplicantsTable from "./ApplicantsTable";

const CriteriaCard = ({
    criteria,
    isExpanded,
    applicants,
    loading,
    fetchApplicants,
    openMessageModal,
    revertCriteriaSelection,
    setExpandedCriteriaId,
}) => {
    const handleToggle = () => {
        if (isExpanded) {
            setExpandedCriteriaId(null);
        } else {
            fetchApplicants(criteria.id);
        }
    };

    return (
        <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-primary">
                    {criteria.job_name || "Job Removed"}
                </h3>
                <span className="text-sm text-gray-500">
                    {format(new Date(criteria.timestamp), "yyyy-MM-dd HH:mm")}
                </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                <p><strong>Location:</strong> {criteria.location || "Any"}</p>
                <p><strong>Gender:</strong> {criteria.gender || "Any"}</p>
                <p><strong>Min Experience:</strong> {criteria.min_experience_years ?? "Any"}</p>
                <p><strong>Min CGPA:</strong> {criteria.min_cgpa ?? "Any"}</p>
                <p><strong>Min Exit Score:</strong> {criteria.min_exit_score ?? "Any"}</p>
                <p><strong>Matched Applicants:</strong> {criteria.matched_applicants}</p>
            </div>

            {!criteria.message_sent && (
                <>
                    <div className="flex gap-2 mb-2">
                        <button
                            onClick={() => openMessageModal(criteria.id)}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Send Message
                        </button>
                        <button
                            onClick={() => revertCriteriaSelection(criteria.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Revert
                        </button>
                        <button
                            onClick={handleToggle}
                            className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            {isExpanded ? "Hide Applicants" : "View Applicants"}
                        </button>
                    </div>
                    {isExpanded && (
                        <ApplicantsTable applicants={applicants} loading={loading} />
                    )}
                </>
            )}
        </div>
    );
};

export default CriteriaCard;
