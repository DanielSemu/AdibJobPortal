import { useEffect, useState } from "react";
import { format } from "date-fns";
import axiosInstance from "../../api/axiosInstance";

const SelectedApplicants = () => {
    const [criterias, setCriterias] = useState([]);
    const [filteredCriterias, setFilteredCriterias] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState("all");

    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedCriteriaId, setSelectedCriteriaId] = useState(null);
    const [message, setMessage] = useState("");

    const fetchCriterias = async () => {
        try {
            const res = await axiosInstance.get("/applications/criterias/");
            setCriterias(res.data);
            setFilteredCriterias(res.data);

            const uniqueJobs = [
                ...new Map(
                    res.data
                        .filter((c) => c.job) // Ensure job is not null
                        .map((item) => [item.job, { id: item.job, title: item.job_name }])
                ).values(),
            ];

            setJobs(uniqueJobs);
        } catch (error) {
            console.error("Error fetching criterias:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleJobFilter = (e) => {
        const jobId = e.target.value;

        setSelectedJob(jobId);

        if (jobId === "all") {
            setFilteredCriterias(criterias);
        } else {
            const filtered = criterias.filter((c) => c.job == jobId); // ✅ fix here
            setFilteredCriterias(filtered);
        }
    };


    const sendMessageToBackend = async () => {
        try {
            await axiosInstance.post("/applications/send-message/", {
                criteria_id: selectedCriteriaId,
                message,
            });
            alert("Message sent successfully!");
            setShowModal(false);
            setMessage("");
        } catch (error) {
            console.error("Sending message failed:", error);
            alert("Failed to send message.");
        }
    };

    const openMessageModal = (criteriaId) => {
        setSelectedCriteriaId(criteriaId);
        setShowModal(true);
    };

    const revertCriteriaSelection = (id) => {
        // TODO: implement logic to undo selection
        alert(`Revert logic to be implemented for criteria ID ${id}`);
    };

    useEffect(() => {
        fetchCriterias();
    }, []);

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto py-6 px-2 bg-white shadow-lg rounded-lg mt-10 text-center">
                <p>Loading criterias...</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-6 px-4 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Selected Applicant Criterias</h2>

            {/* 🔍 Job Filter Dropdown */}
            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-1">Filter by Job</label>
                <select
                    className="w-full border p-2 rounded-md"
                    value={selectedJob}
                    onChange={handleJobFilter}
                >
                    <option value="all">-- Show All Jobs --</option>
                    {jobs.map((job) => (
                        <option key={job.id} value={job.id}>
                            {job.title}
                        </option>
                    ))}
                </select>

            </div>

            {/* Criteria List */}
            {filteredCriterias.length === 0 ? (
                <p className="text-center text-gray-500">No criterias found for selected job.</p>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {filteredCriterias.map((item) => (
                        <div
                            key={item.id}
                            className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold text-blue-700">
                                    {item.job_name || "Job Removed"}
                                </h3>
                                <span className="text-sm text-gray-500">
                                    {format(new Date(item.timestamp), "yyyy-MM-dd HH:mm")}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                                <p><strong>Location:</strong> {item.location || "Any"}</p>
                                <p><strong>Gender:</strong> {item.gender || "Any"}</p>
                                <p><strong>Min Experience:</strong> {item.min_experience_years ?? "Any"}</p>
                                <p><strong>Min CGPA:</strong> {item.min_cgpa ?? "Any"}</p>
                                <p><strong>Min Exit Score:</strong> {item.min_exit_score ?? "Any"}</p>
                                <p><strong>Matched Applicants:</strong> {item.matched_applicants}</p>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => openMessageModal(item.id)}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Send Message
                                </button>
                                <button
                                    onClick={() => revertCriteriaSelection(item.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Revert Selection
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Send Message to Applicants</h3>
                        <textarea
                            className="w-full h-28 border border-gray-300 rounded-md p-2 resize-none"
                            placeholder="Write your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                onClick={() => alert("Test Message: " + message)}
                            >
                                Test
                            </button>
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                onClick={sendMessageToBackend}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectedApplicants;
