/* eslint-disable react/prop-types */
const ApplicantsTable = ({ applicants = [], loading }) => {
    if (loading) return <p className="text-gray-500 text-sm">Loading applicants...</p>;

    if (!applicants.length) return <p className="text-gray-500 text-sm">No applicants found.</p>;

    return (
        <div className="mt-2 max-h-64 overflow-auto border-t pt-2">
            <table className="min-w-full border text-sm">
                <thead className="bg-gray-100 sticky top-0">
                    <tr>
                        <th className="border px-2 py-1 text-left">Name</th>
                        <th className="border px-2 py-1 text-left">Gender</th>
                        <th className="border px-2 py-1 text-left">Phone</th>
                        <th className="border px-2 py-1 text-left">Education</th>
                        <th className="border px-2 py-1 text-left">CGPA</th>
                        <th className="border px-2 py-1 text-left">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {applicants.map((app, index) => (
                        <tr key={index}>
                            <td className="border px-2 py-1">{app.full_name}</td>
                            <td className="border px-2 py-1">{app.gender}</td>
                            <td className="border px-2 py-1">{app.phone}</td>
                            <td className="border px-2 py-1">{app.education ?? "-"}</td>
                            <td className="border px-2 py-1">{app.cgpa ?? "-"}</td>
                            <td className="border px-2 py-1">X</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicantsTable;
