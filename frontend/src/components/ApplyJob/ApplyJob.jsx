import { useState } from "react";
import { useParams } from "react-router-dom";
import { jobs } from "../../data/jobs";
import { FaAngleDoubleRight, FaAngleDoubleLeft, FaCheck } from "react-icons/fa"; 

const ApplyJob = () => {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    birthDate: "",
    educations: [],
    fieldStudy: "",
    graduationYear: "",
    educationOrganization: "",
    experiences: [], 
    certifications:[]
  });
  const [errors, setErrors] = useState({});

  // Temporary state to hold current experience input
  const [currentExperience, setCurrentExperience] = useState({
    jobTitle: "",
    companyName: "",
    from: "",
    to: "",
  });
  const [currentEducation, setCurrentEducation] = useState({
    educationLevel: "",
    fieldOfStudy: "",
    graduationYear: "",
    educationOrganization: "",
  });
  const [currentCertification, setCurrentCertification] = useState({
    certificateTitle: "",
    awardingCompany: "",
    awardedDate: "",
    certificate: "",
  });

  const handleInputChange = (section, e) => {
    const { name, value } = e.target;
    switch (section) {
      case "experience":
        setCurrentExperience((prev) => ({ ...prev, [name]: value }));
        break;
      case "education":
        setCurrentEducation((prev) => ({ ...prev, [name]: value }));
        break;
      case "certification":
        setCurrentCertification((prev) => ({ ...prev, [name]: value }));
        break;
      default:
        break;
    }
  };
  

  const addEntry = (section, entry, setEntry) => {
    if (Object.values(entry).some((val) => val === "")) return; // Ensure all fields are filled
  
    setFormData((prevData) => ({
      ...prevData,
      [section]: [...prevData[section], entry],
    }));
  
    // Reset the corresponding input state
    setEntry(Object.fromEntries(Object.keys(entry).map((key) => [key, ""])));
  };
  

  const removeEntry = (section, index) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: prevData[section].filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    let newErrors = {};
  
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.birthDate) newErrors.birthDate = "Birthdate is required";
  
    if (formData.educations.length === 0) newErrors.educations = "Education is required";

  
    return newErrors;
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
    const newErrors = validateForm();

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);

    // Redirect to first page with error
    if (newErrors.fullName || newErrors.email || newErrors.phone|| newErrors.birthDate) {
      setStep(1);
    } else if (newErrors.educations || newErrors.experiences) {
      setStep(2);
    }

  } else {
    console.log("Form Submitted:", formData);
    alert("Form Submitted Successfully!");
  }
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
          {[1, 2, 3, 4,5].map((s) => (
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
          <h1 className="text-center text-3xl mb-2 text-gray-700 font-semibold">
            Personal Information
          </h1>
          
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-blue-500"
              required
            />
            {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
          </div>
        
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email Address:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-blue-500"
              required
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
        
          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Phone Number:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-blue-500"
              required
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>
        
          {/* Gender and Age in One Line, Responsive */}
          <div className="flex flex-col md:flex-row md:space-x-6 items-center mt-3 mb-4">
            {/* Gender */}
            <div className="flex space-x-4 md:w-auto w-full mb-2 md:mb-0">
              <span className="font-semibold text-gray-700">Gender:</span>
              <label className="flex items-center space-x-2">
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
            
            {/* Age */}
            <div className="flex items-center w-full md:w-auto">
              <label className="text-gray-700 font-semibold mr-2">Birthdate:</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-blue-500 flex-grow md:flex-none"
                required
              />
              
            </div>
          </div>
          {errors.gender && <p className="text-red-500">{errors.gender}</p>}
          {errors.birthDate && <p className="text-red-500">{errors.birthDate}</p>}
        </div>
        
         
          )}
          {step === 2 && (
            <div>
              <h1 className="text-center text-3xl mb-2 text-gray-700 font-semibold ">
                Educational Background
              </h1>
             {/* Display Added Educations */}
             <div className="flex flex-wrap gap-2 mt-2">
                {formData.educations.map((edu, index) => (
                <span key={index}  className="px-3 py-1 bg-gray-200 rounded-lg text-gray-800 text-sm">
                {edu.educationLevel}{" in "}{edu.fieldOfStudy}  <span onClick={() => removeEntry("educations", index)}  className="float-end ml-1 text-xl text-red-600 cursor-pointer">x</span>
                <br /> {" from "} {edu.educationOrganization} 
                </span>
                ))}
              </div>
              {/* Education */}
              <div>
              {errors.educations && <p className="text-red-500">{errors.educations}</p>}
                <label className="block text-gray-700 font-semibold mb-2">
                  Highest Education:
                </label>
                <select
                  name="educationLevel"
                  value={currentEducation.educationLevel}
                  onChange={(e) => handleInputChange("education", e)}
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
                  name="fieldOfStudy"
                  value={currentEducation.fieldOfStudy}
                  onChange={(e) => handleInputChange("education", e)}
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
                  value={currentEducation.graduationYear}
                  onChange={(e) => handleInputChange("education", e)}
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
                  value={currentEducation.educationOrganization}
                  onChange={(e) => handleInputChange("education", e)}
                  className="w-full p-2 border rounded-md focus:outline-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => addEntry("educations", currentEducation, setCurrentEducation)}
                  className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Add Education
                </button>
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
                <span key={index}  className="px-3 py-1 bg-gray-200 rounded-lg text-gray-800 text-sm">
                {exp.jobTitle} <span onClick={() => removeEntry("experiences", index)}  className="float-end text-red-600 cursor-pointer">x</span>
                <br /> {exp.companyName} - {exp.from} {" to "}{exp.to} years 
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
                  onChange={(e) => handleInputChange("experience", e)}
                  className="w-full p-2 border rounded-md focus:outline-blue-500"
                />

                <label className="block text-gray-700 font-semibold mt-3 mb-2">
                  Company Name:
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={currentExperience.companyName}
                  onChange={(e) => handleInputChange("experience", e)}
                  className="w-full p-2 border rounded-md focus:outline-blue-500"
                />

                <label className="block text-gray-700 font-semibold mt-3 mb-2">
                  Years of Experience:
                </label>
                <div className="grid sm:grid-cols-2 gap-2">
                <div className="flex">
                <label className="block text-gray-700 font-semibold mt-3 mb-2">
                  From:
                </label>
                  <input
                  type="date"
                  name="from"
                  value={currentExperience.from}
                  onChange={(e) => handleInputChange("experience", e)}
                  className="w-full p-2 border rounded-md focus:outline-blue-500"
                />
                </div>
                <div className="flex">
                <label className="block text-gray-700 font-semibold mt-3 mb-2">
                  To:
                </label>
                  <input
                  type="date"
                  name="to"
                  value={currentExperience.to}
                  onChange={(e) => handleInputChange("experience", e)}
                  className="w-full p-2 border rounded-md focus:outline-blue-500"
                />
                </div>
                </div>
                

                <button
                  type="button"
                  onClick={() => addEntry("experiences", currentExperience, setCurrentExperience)}
                  className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Add Experience
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
             <div>
             <h1 className="text-center text-3xl mb-2 text-gray-700 font-semibold">
               Certifications/Recognitions <span className="text-xl">(Optional)</span>
             </h1>

             {/* Display Added Experiences */}
             <div className="flex flex-wrap gap-2 mt-2">
               {formData.certifications.map((cert, index) => (
               <span key={index}  className="px-3 py-1 bg-gray-200 rounded-lg text-gray-800 text-sm">
               {cert.certificateTitle} <span onClick={() => removeEntry("certifications", index)}  className="float-end text-red-600 cursor-pointer">x</span>
               <br />{" by "} {cert.awardingCompany} {" in "}{cert.awardedDate} 
               </span>
               ))}
             </div>

             {/* Input Fields for New Experience */}
             <div className="mt-4">
               <label className="block text-gray-700 font-semibold mb-1">
                 Certificate Title:
               </label>
               <input
                 type="text"
                 name="certificateTitle"
                 value={currentCertification.certificateTitle}
                 onChange={(e) => handleInputChange("certification", e)}
                 className="w-full p-2 border rounded-md focus:outline-blue-500"
               />

               <label className="block text-gray-700 font-semibold mt-1 mb-1">
                 Awarding Company:
               </label>
               <input
                 type="text"
                 name="awardingCompany"
                 value={currentCertification.awardingCompany}
                 onChange={(e) => handleInputChange("certification", e)}
                 className="w-full p-2 border rounded-md focus:outline-blue-500"
               />
               <label className="block text-gray-700 font-semibold mt-1 mb-1">
                 Awarding Date:
               </label>
               <input
                 type="date"
                 name="awardedDate"
                 value={currentCertification.awardedDate}
                 onChange={(e) => handleInputChange("certification", e)}
                 className="w-full p-2 border rounded-md focus:outline-blue-500"
               />
               <label className="block text-gray-700 font-semibold mb-2">
                  Upload Certificate (PDF/DOCX)
                </label>
                <input
                  type="file"
                  name="certificate"
                  accept=".pdf, .doc, .docx"
                  onChange={(e) => handleInputChange("certification", e)}
                  className="w-full p-2 border rounded-md focus:outline-blue-500"
                  required
                />
               <button
                 type="button"
                 onClick={() => addEntry("certifications", currentCertification, setCurrentCertification)}
                 className="mt-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
               >
                 Add Certificate
               </button>
             </div>
           </div>
          )}

          {step === 5 && (
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

            {step > 1 && step < 5 && (
              <FaAngleDoubleRight onClick={nextStep} className="text-3xl" />
            )}

            {step === 5 && (
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
