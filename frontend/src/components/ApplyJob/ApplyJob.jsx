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
import { showErrorToast, showSuccessToast } from "../utils/toastUtils";
import { profile } from "../../api/auth";

const ApplyJob = () => {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [detailedData, setDetailedData] = useState([]);
  const [userProfile, setUserProfile]=useState([])
  const [formData, setFormData] = useState({
    job:id,
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
  const [fetchError, setFetchError] = useState(false);

  // Temporary state to hold current experience input
  const [currentExperience, setCurrentExperience] = useState({
    job_title: "",
    company_name: "",
    from_date: "",
    to_date: "",
    banking_experience:true,
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
    const fetchProfile= async ()=>{
      try {
        const response=await profile()
        console.log(response);
        
        if( response){
          setUserProfile(response);
        setFormData((prevFormData) => ({
          ...prevFormData,
          full_name: response.full_name || "",
          email: response.email || "",
          phone: response.phone_number|| "",
          gender: response.gender || "",
          birth_date: response.birthdate || "",
        }));
        }
        else{

        }
      } catch (error) {
        console.error("Error fetching job:", error);
        // setFetchError(true);
      }
    }
    const fetchJob = async () => {
      try {
        const response = await getSingleJob(parseInt(id));
        if (response) {
          setDetailedData(response);
        } else {
          setFetchError(true);
        }
      } catch (error) {
        console.error("Error fetching job:", error);
        setFetchError(true);
      }
    };
    fetchJob();
    fetchProfile()
  }, [id]);


  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
  
    if (type === 'file' && files && files[0]) {
      const file = files[0];
      console.log("here");
      
      // Create a unique identifier (e.g., using timestamp or any other unique value)
      const uniqueIdentifier = Date.now(); // Using timestamp as the unique identifier
  
      // Create a new file with the common base name and the unique identifier
      const renamedFile = new File([file], `applicant_resume_${uniqueIdentifier}${file.name.slice(file.name.lastIndexOf('.'))}`, { type: file.type });
  
      setFormData({
        ...formData,
        [name]: renamedFile // Store the renamed file in state
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

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

  

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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
        console.log(formData.resume);
        formData.resume=null

        const response = await axiosInstance.post("applicants/", formData);
        console.log(response);
        showSuccessToast("Application Submitted Successfully Inserted ")
      } catch (error) {
        console.error("Error response:", error.response.data);  
        showErrorToast(error.response.data.error || "An error occurred.");
      }
    }
  };
  if (fetchError) {
    return <div className="main-container text-red-500">There is no job with this ID.</div>;
  }

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
            <Step5 formData={formData}  handleChange={handleChange} />
          )}
          {/* Fixed Buttons at the Bottom */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-5 pb-0">
            {step > 1 ? (
              <button
              type="button"
              onClick={prevStep}
              className="bg-gray-600 text-white rounded-full py-2 px-6 flex items-center gap-2"
            >
              <FaAngleDoubleLeft /> Previous
            </button>
            ) : (
              <div className="ml-auto">
                <button
              type="button"
              onClick={nextStep}
              className="bg-blue-600 text-white rounded-full py-2 px-6 flex items-center gap-2"
            >
              Next <FaAngleDoubleRight />
            </button>
              </div>
            )}

            {step > 1 && step < 5 && (
              <button
              type="button"
              onClick={nextStep}
              className="bg-blue-600 text-white rounded-full py-2 px-6 flex items-center gap-2"
            >
              Next <FaAngleDoubleRight />
            </button>
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
