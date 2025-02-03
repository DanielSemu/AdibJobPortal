import { useState } from "react";
import { useParams } from "react-router-dom";
import { jobs } from "../../data/jobs";
import {
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
  FaCheck,
} from "react-icons/fa"; // Import Icons

const ApplyJob = () => {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    salary: "",
    education: "",
    experience: "",
    resume: null,
    coverLetter: "",
    consent: false,
  });

  const detailedData = jobs.find((item) => item.id === Number(id));

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Application Submitted Successfully!");
  };
  return (
    <div className="main-container flex flex-col md:flex-row bg-gray-100 sm:pb-8 gap-1 min-h-screen">
      {/* Sidebar with Job Details */}
      <div className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {detailedData.jobTitle}
        </h2>
        <p className="text-lg text-gray-600 mt-2 font-medium">
          {detailedData.company}
        </p>
        <p className="text-gray-700 mt-4 leading-relaxed">
          {detailedData.description}
        </p>
        <div className="mt-4 text-gray-800">
          <strong>📍 Location:</strong> {detailedData.location}
        </div>
        <div className="mt-2 text-gray-800">
          <strong>💰 Salary:</strong> {detailedData.salary}
        </div>
        <div className="mt-2 text-gray-800">
          <strong>🗓️ Dead Line:</strong> {detailedData.deadLine}
        </div>
        
      </div>

      {/* Application Form */}
      <div className="w-full md:w-2/3 bg-white shadow-xl rounded-lg p-5 pb-12 md:p-10 md:ml-8 relative">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
          Apply for {detailedData.jobTitle}
        </h1>

        {/* Progress Bar */}
        <div className="relative pt-5 mb-8">
          <div className="w-full bg-gray-300 rounded-full h-3">
            <div
              className="bg-[#007dda] h-3  transition-all duration-400"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 ">
          {step === 1 && (
            <div>
               <div>
            <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-blue-500"
              required
            />
          </div>

              {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-blue-500"
              required
            />
          </div>
           {/* Phone Number */}
           <div>
            <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-blue-500"
              required
            />
          </div>
           {/* Education */}
           <div>
            <label className="block text-gray-700 font-semibold mb-2">Highest Education</label>
            <select
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-blue-500"
              required
            >
              <option value="">Select</option>
              <option value="High School">High School</option>
              <option value="Bachelor’s Degree">Bachelor’s Degree</option>
              <option value="Master’s Degree">Master’s Degree</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

            </div>
          )}
          {step === 2 && (
            <div>
              {/* Work Experience */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Years of Experience</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-blue-500"
              required
            />
          </div>
               {/* Resume Upload */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Upload Resume (PDF/DOCX)</label>
            <input
              type="file"
              name="resume"
              accept=".pdf, .doc, .docx"
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-blue-500"
              required
            />
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Cover Letter</label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-blue-500"
              rows="4"
            ></textarea>
          </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              <label className="block text-gray-700 font-semibold mt-4 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              <label className="block text-gray-700 font-semibold mt-4 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              <label className="block text-gray-700 font-semibold mt-4 mb-2">
                Phone Number
              </label>
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

          {step === 4 && (
            <div>
             
          {/* Consent Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label className="block text-gray-700 font-semibold mb-2">
              I agree to the <span className="text-blue-600 cursor-pointer">terms and conditions</span>
            </label>
          </div>

            </div>
          )}

          {/* Fixed Buttons at the Bottom */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-5 pb-1">
            {step > 1 ? (
              <FaAngleDoubleLeft onClick={prevStep} className="text-3xl" />
            ) : (
              <div className="ml-auto">
                <FaAngleDoubleRight onClick={nextStep} className="text-3xl" />
              </div>
            )}

            {step > 1 && step < 4 && (
              <FaAngleDoubleRight onClick={nextStep} className="text-3xl" />
            )}

            {step === 4 && (
              <button
                type="submit"
                className="px-4 py-1 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 flex items-center transition duration-200 ml-auto"
              >
                Submit <FaCheck className="ml-1" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyJob;
