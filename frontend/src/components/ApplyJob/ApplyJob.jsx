import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jobs } from "../../data/jobs";
import { FaAngleDoubleRight, FaAngleDoubleLeft, FaCheck } from "react-icons/fa";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import { getSingleJob } from "../../services/jobsService";
import axiosInstance from "../../services/axiosInstance";
import axios from "axios";

const ApplyJob = () => {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [detailedData, setDetailedData] = useState([]);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    gender: "",
    birth_date: "",
    contact_consent: false,
    cover_letter: "",
    resume: null,
    terms_accepted: false,
    educations: [],
    experiences: [],
    certifications: [],
  });
  const [errors, setErrors] = useState({});

  // Temporary state to hold current experience input
  const [currentExperience, setCurrentExperience] = useState({
    job_title: "",
    company_name: "",
    from_date: "",
    to_date: "",
  });
  const [currentEducation, setCurrentEducation] = useState({
    education_level: "",
    field_of_study: "",
    education_organization: "",
    graduation_year: "",
  });
  const [currentCertification, setCurrentCertification] = useState({
    certificate_title: "",
    awarding_company: "",
    awarded_date: "",
    certificate_file: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getSingleJob(parseInt(id));
        setDetailedData(response);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    fetchJob();
  }, [id]);

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

    if (!formData.full_name.trim())
      newErrors.full_name = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.birth_date) newErrors.birth_date = "birth_date is required";

    if (formData.educations.length === 0)
      newErrors.educations = "Education is required";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));  
    
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
  
      // Redirect to the appropriate step if there are errors
      if (
        newErrors.full_name ||
        newErrors.email ||
        newErrors.phone ||
        newErrors.birth_date
      ) {
        setStep(1);
      } else if (newErrors.educations || newErrors.experiences) {
        setStep(2);
      }
    } else {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
  
      try {
        
        // formData.resume=null
        console.log(formData);
        const response = await axiosInstance.post("http://127.0.0.1:8000/api/applicants/", formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
  
        console.log(response);
  
        // // Prepare JSON file for download
        // const jsonString = JSON.stringify(formData, null, 2);
        // const blob = new Blob([jsonString], { type: "application/json" });
  
        // // Create a download link
        // const a = document.createElement("a");
        // a.href = URL.createObjectURL(blob);
        // a.download = "applicant_data.json"; // Ensure correct file name
        // document.body.appendChild(a);
        // a.click();
        // document.body.removeChild(a);
  
        alert("Form data has been exported as JSON file!");
      } catch (error) {
        if (error.response) {
          console.error("Server Error:", error.response.data);
        } else if (error.request) {
          console.error("Network Error:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      }
    }
  };
  
  return (
    <div className="main-container flex flex-col md:flex-row bg-gray-100 sm:pb-8 gap-1 min-h-screen">
      {/* Sidebar with Job Details */}
      <div className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {detailedData.title}
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
          <strong>🗓️ Dead Line:</strong> {detailedData.application_deadline}
        </div>
      </div>

      {/* Application Form */}
      <div className="w-full md:w-2/3 bg-white shadow-xl rounded-lg p-5 pb-12 md:p-10 md:ml-8 relative">
        {/* Step Indicators */}
        <div className="flex justify-center space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((s) => (
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
            <Step1
              formData={formData}
              errors={errors}
              handleChange={handleChange}
            />
          )}
          {step === 2 && (
            <Step2
              currentEducation={currentEducation}
              handleInputChange={handleInputChange}
              formData={formData}
              errors={errors}
              addEntry={addEntry}
              removeEntry={removeEntry}
              setCurrentEducation={setCurrentEducation}
            />
          )}
          {step === 3 && (
            <Step3
              currentExperience={currentExperience}
              handleInputChange={handleInputChange}
              formData={formData}
              addEntry={addEntry}
              removeEntry={removeEntry}
              setCurrentExperience={setCurrentExperience}
            />
          )}
          {step === 4 && (
            <Step4
              currentCertification={currentCertification}
              handleInputChange={handleInputChange}
              formData={formData}
              addEntry={addEntry}
              removeEntry={removeEntry}
              setCurrentCertification={setCurrentCertification}
            />
          )}
          {step === 5 && (
            <Step5 formData={formData} handleChange={handleChange} />
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
