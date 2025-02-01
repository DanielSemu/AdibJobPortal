import { useState } from "react";
import { useParams } from "react-router-dom";
import { data } from "../../data/jobs";
import { FaArrowLeft, FaArrowRight, FaCheck } from "react-icons/fa"; // Import Icons

const ApplyJob = () => {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
  });

  const detailedData = data.find((item) => item.id === Number(id));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Your application has been submitted successfully!");
  };

  return (
    <div className="main-container flex flex-col md:flex-row bg-gray-100 sm:pb-8 gap-1 min-h-screen">
      {/* Sidebar with Job Details */}
      <div className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900">{detailedData.jobTitle}</h2>
        <p className="text-lg text-gray-600 mt-2 font-medium">{detailedData.company}</p>
        <p className="text-gray-700 mt-4 leading-relaxed">{detailedData.description}</p>
        <div className="mt-4 text-gray-800">
          <strong>📍 Location:</strong> {detailedData.location}
        </div>
        <div className="mt-2 text-gray-800">
          <strong>💰 Salary:</strong> {detailedData.salary}
        </div>
      </div>

      {/* Application Form */}
      <div className="w-full md:w-2/3 bg-white shadow-xl rounded-lg p-5 pb-12 border-2 border-red-500 md:p-10 md:ml-8 relative">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">Apply for {detailedData.jobTitle}</h1>

        {/* Progress Bar */}
        <div className="relative pt-5 mb-8">
          <div className="w-full bg-gray-300 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 border-2 border-red-500">
          {step === 1 && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              <label className="block text-gray-700 font-semibold mt-4 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              <label className="block text-gray-700 font-semibold mt-4 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          {step === 3 && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Upload Resume</label>
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              <label className="block text-gray-700 font-semibold mt-4 mb-2">Cover Letter</label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows="4"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>
          )}

          {/* Fixed Buttons at the Bottom */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-5">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 text-lg font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-700 flex items-center transition duration-200"
              >
                <FaArrowLeft className="mr-2" /> Back
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-2 py-1 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center transition duration-200 ml-auto"
              >
                Next <FaArrowRight className="ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-2 py-1 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 flex items-center transition duration-200 ml-auto"
              >
                Submit <FaCheck className="ml-2" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyJob;
