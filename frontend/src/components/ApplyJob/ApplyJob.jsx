import { useState } from "react";
import { useParams } from "react-router-dom";
import { jobs } from "../../data/jobs";
import { FaAngleDoubleRight, FaAngleDoubleLeft, FaCheck, FaCross } from "react-icons/fa"; // Import Icons

const ApplyJob = () => {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    education: "",
    fieldStudy: "",
    graduationYear: "",
    educationOrganization: "",
    experiences: [], // Array to store multiple experiences
  });

  // Temporary state to hold current experience input
  const [currentExperience, setCurrentExperience] = useState({
    jobTitle: "",
    companyName: "",
    yearsOfExperience: "",
  });

  // Handle input change for new experience entry
  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setCurrentExperience({
      ...currentExperience,
      [name]: value,
    });
  };

  // Add a new experience to the list
  const addExperience = () => {
    if (
      currentExperience.jobTitle &&
      currentExperience.companyName &&
      currentExperience.yearsOfExperience
    ) {
      setFormData((prevData) => ({
        ...prevData,
        experiences: [...prevData.experiences, currentExperience],
      }));
      setCurrentExperience({
        jobTitle: "",
        companyName: "",
        yearsOfExperience: "",
      });
    }
  };

  // Remove an experience from the list
  const removeExperience = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      experiences: prevData.experiences.filter((_, i) => i !== index),
    }));
  };

  const detailedData = jobs.find((item) => item.id === Number(id));

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
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
        {/* Step Indicators */}
        <div className="flex justify-center space-x-2 mb-4">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-3 w-3 rounded-full cursor-pointer transition-all ${
                step === s ? "bg-blue-500 scale-125" : "bg-gray-300"
              }`}
              onClick={() => setStep(s)} // Update step on click
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 ">
          {step === 1 && (
            <div>
              <h1 className="text-center text-3xl mb-2 text-gray-700 font-semibold ">
                Personal Information
              </h1>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Full Name:
                </label>
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
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address:
                </label>
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
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-blue-500"
                  required
                />
              </div>
              <label className="block text-gray-700 font-semibold mb-2">
                Gender:
              </label>
              <div className="flex space-x-4 mb-4">
                <label className="flex items-center space-x-2 ">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h1 className="text-center text-3xl mb-2 text-gray-700 font-semibold ">
                Education Background
              </h1>
              {/* Education */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Highest Education:
                </label>
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
              {/* Field of Study */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Field of Study:
                </label>
                <input
                  type="text"
                  name="fieldStudy"
                  value={formData.fieldStudy}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-blue-500"
                  required
                />
              </div>
              {/* Graduation Year */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Graduation Year:
                </label>
                <input
                  type="date"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-blue-500"
                  required
                />
              </div>
              {/* Field of Study */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Education Organization:
                </label>
                <input
                  type="text"
                  name="educationOrganization"
                  value={formData.educationOrganization}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-blue-500"
                  required
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h1 className="text-center text-3xl mb-2 text-gray-700 font-semibold">
                Work Experience <span className="text-xl">(Optional)</span>
              </h1>

              {/* Display Added Experiences */}
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.experiences.map((exp, index) => (
                <span className="px-3 py-1 bg-gray-200 rounded-lg text-gray-800 text-sm">
                {exp.jobTitle} <span onClick={() => removeExperience(index)}  className="float-end text-red-600 cursor-pointer">x</span>
                <br /> {exp.companyName} - {exp.yearsOfExperience} years 
                </span>
                ))}
              </div>

              {/* Input Fields for New Experience */}
              <div className="mt-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Job Title:
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={currentExperience.jobTitle}
                  onChange={handleExperienceChange}
                  className="w-full p-2 border rounded-md focus:outline-blue-500"
                />

                <label className="block text-gray-700 font-semibold mt-3 mb-2">
                  Company Name:
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={currentExperience.companyName}
                  onChange={handleExperienceChange}
                  className="w-full p-2 border rounded-md focus:outline-blue-500"
                />

                <label className="block text-gray-700 font-semibold mt-3 mb-2">
                  Years of Experience:
                </label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={currentExperience.yearsOfExperience}
                  onChange={handleExperienceChange}
                  className="w-full p-2 border rounded-md focus:outline-blue-500"
                />

                <button
                  type="button"
                  onClick={addExperience}
                  className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Add Experience
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h1 className="text-center text-3xl mb-2 text-gray-700 font-semibold ">
                Additional Information
              </h1>
              {/* Resume Upload */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Upload Resume (PDF/DOCX)
                </label>
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
                <label className="block text-gray-700 font-semibold mb-2">
                  Cover Letter
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-blue-500"
                  rows="4"
                ></textarea>
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                <label className="block text-gray-700 font-semibold">
                  I agree to the{" "}
                  <span className="text-blue-600 cursor-pointer">
                    Terms and Conditions
                  </span>
                  .
                </label>
              </div>

              {/* Consent to Contact Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="contactConsent"
                  checked={formData.contactConsent}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                <label className="block text-gray-700 font-semibold">
                  I consent to being contacted by the company for updates
                  regarding my application.
                </label>
              </div>
            </div>
          )}

          {/* Fixed Buttons at the Bottom */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-5 pb-5">
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
