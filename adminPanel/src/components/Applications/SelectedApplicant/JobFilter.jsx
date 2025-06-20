/* eslint-disable react/prop-types */
const JobFilter = ({ jobs, selectedJob, onChange }) => (
    <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-1">Filter by Job</label>
        <select
            className="w-full border p-2 rounded-md"
            value={selectedJob}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="all">-- Show All Jobs --</option>
            {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                    {job.title}
                </option>
            ))}
        </select>
    </div>
);

export default JobFilter;
