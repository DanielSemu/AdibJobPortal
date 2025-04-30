import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
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
import { profile, sendOTP } from "../../api/auth";


const ApplyJob = () => {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [detailedData, setDetailedData] = useState([]);
  const [list, setList] = useState([]);
  const [verificationModal, setVerificationModal] = useState(false);
  const [userProfile, setUserProfile] = useState([]);
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    job: id,
    full_name: "",
    email: "",
    phone: "",
    gender: "",
    birth_date: "",
    contact_consent: false,
    cover_letter: "",
    resume: null,
    terms_accepted: false,
    selected_work_place: "",
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
    banking_experience: false,
  });
  const [currentEducation, setCurrentEducation] = useState({
    education_level: "",
    field_of_study: "",
    education_organization: "",
    graduation_year: "",
    cgpa: null,
    exit_exam: null,
  });
  const [currentCertification, setCurrentCertification] = useState({
    certificate_title: "",
    awarding_company: "",
    awarded_date: "",
    // certificate_file: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profile();

        if (response) {
          setUserProfile(response);
          setFormData((prevFormData) => ({
            ...prevFormData,
            full_name: response.full_name || "",
            email: response.email || "",
            phone: response.phone_number || "",
            gender: response.gender || "",
            birth_date: response.birthdate || "",
          }));
        } else {
        }
      } catch (error) {
        console.error("Error fetching job:", error);
        // setFetchError(true);
      }
    };
    const fetchJob = async () => {
      try {
        const response = await getSingleJob(parseInt(id));
        if (response) {
          setDetailedData(response);
          if (!response.show_experience) {
            setList([1, 2, 4, 5]);
          } else {
            setList([1, 2, 3, 4, 5]);
          }
        } else {
          setFetchError(true);
        }
      } catch (error) {
        console.error("Error fetching job:", error);
        setFetchError(true);
      }
    };
    fetchJob();
    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === "file" && files && files[0]) {
      const file = files[0];
      const uniqueIdentifier = Date.now();
      const renamedFile = new File(
        [file],
        `applicant_resume_${uniqueIdentifier}${file.name.slice(
          file.name.lastIndexOf(".")
        )}`,
        { type: file.type }
      );
      setFormData({
        ...formData,
        [name]: renamedFile,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleInputChange = (section, e) => {
    const { name, value, type, checked, files } = e.target;
    
    switch (section) {
      case "experience":
        setCurrentExperience((prev) => ({
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        }));
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
  const validateEntry = (section, entry) => {
    const errors = {};
  
    if (section === "experiences") {
      if (!entry.job_title.trim()) errors.job_title = "Job title is required.";
      if (!entry.company_name.trim()) errors.company_name = "Company name is required.";
      if (!entry.from_date) errors.from_date = "From date is required.";
      if (!entry.to_date) errors.to_date = "To date is required.";
    }
  
    if (section === "educations") {
      const cgpa = parseFloat(entry.cgpa);
      const exit_exam = parseFloat(entry.exit_exam);
  
      if (!entry.education_level.trim()) errors.education_level = "Education level is required.";
      if (!entry.field_of_study.trim()) errors.field_of_study = "Field of study is required.";
      if (!entry.education_organization.trim()) errors.education_organization = "Organization is required.";
      if (!entry.graduation_year) errors.graduation_year = "Graduation year is required.";
  
      if (isNaN(cgpa) || cgpa < 2 || cgpa > 4) errors.cgpa = "CGPA should be between 2 and 4.";
      if ((exit_exam < 50 && exit_exam !=0) || exit_exam > 100) errors.exit_exam = "Exit exam should be between 50 and 100.";
    }
  
    if (section === "certifications") {
      if (!entry.certificate_title.trim()) errors.certificate_title = "Certificate title is required.";
      if (!entry.awarding_company.trim()) errors.awarding_company = "Awarding company is required.";
      if (!entry.awarded_date) errors.awarded_date = "Awarded date is required.";
    }
  
    return errors;
  };
  
  
  // const fileInputRef = useRef(null);
  const addEntry = (section, entry, setEntry) => {
    // if (Object.values(entry).some((val) => val === "")) return;
    const errors = validateEntry(section, entry);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      showErrorToast("Please fix validation errors.");
      return;
    }
  
    setFormData((prevData) => ({
      ...prevData,
      [section]: [...prevData[section], entry],
    }));
  
    setErrors({}); // clear previous errors
  
    if (section === "experiences") {
      setEntry({
        job_title: "",
        company_name: "",
        from_date: "",
        to_date: "",
        banking_experience: false,
      });
    } else if (section === "educations") {
      setEntry({
        education_level: "",
        field_of_study: "",
        education_organization: "",
        graduation_year: "",
        cgpa: "",
        exit_exam: "",
      });
    } else if (section === "certifications") {
      setEntry({
        certificate_title: "",
        awarding_company: "",
        awarded_date: "",
      });
    }
  };
  

  const removeEntry = (section, index) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: prevData[section].filter((_, i) => i !== index),
    }));
  };



  const validateForm = () => {
    let newErrors = {};
  
    if (!formData.full_name.trim()) newErrors.full_name = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.selected_work_place || formData.selected_work_place.trim() === "") {
      newErrors.selected_work_place = "Work Place is required";
    }
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.birth_date) newErrors.birth_date = "Birth date is required";
    
    if (!formData.contact_consent)
      newErrors.contact_consent = "You must give consent to be contacted";
  
    if (!formData.cover_letter.trim()) 
      newErrors.cover_letter = "Cover letter is required";
  
    if (!formData.resume) newErrors.resume = "Resume is required";
  
    if (!formData.terms_accepted)
      newErrors.terms_accepted = "You must accept the terms and conditions";
  
    if (formData.educations.length === 0)
      newErrors.educations = "At least one education entry is required";
  
    
    return newErrors;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setVerificationModal(false);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (
        newErrors.full_name ||
        newErrors.email ||
        newErrors.phone ||
        newErrors.birth_date
      ) {
        return setStep(1);
      } else if (newErrors.educations || newErrors.experiences) {
        return setStep(2);
      }
      else if (
        newErrors.terms_accepted ||
        newErrors.resume ||
        newErrors.cover_letter ||
        newErrors.contact_consent
      ){
       return setStep(5);
      }
    }

   
    console.log(formData);
    
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        // Convert arrays (lists of objects) to JSON strings
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
    try {
      const response = await axiosInstance.post("applicants/", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setErrors({});
      showSuccessToast("Application Submitted Successfully Inserted ");
      navigate("/")
    } catch (error) {
      console.error("Error response:", error.response.data);
      setErrors({});
      showErrorToast(error.response.data.error);
    }
  };

  const nextStep = () => {
    setStep((prev) => {
      const currentIndex = list.indexOf(prev);
      if (currentIndex !== -1 && currentIndex < list.length - 1) {
        return list[currentIndex + 1]; // Move to the next valid step
      }
      return prev; // Stay on the same step if there's no next step
    });
  };

  // Function to go to the previous available step
  const prevStep = () => {
    setStep((prev) => {
      const currentIndex = list.indexOf(prev);
      if (currentIndex > 0) {
        return list[currentIndex - 1]; // Move to the previous valid step
      }
      return prev; // Stay on the same step if there's no previous step
    });
  };

  if (fetchError) {
    return (
      <div className="main-container text-red-500">
        There is no job with this ID.
      </div>
    );
  }

  return (
    <div className="main-container flex flex-col md:flex-row bg-gray-100 sm:pb-8 gap-1 min-h-screen">
      {/* Sidebar with Job Details */}
      <div className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {detailedData.title} Grade {detailedData.job_grade}
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
          {list.map((s) => (
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
              selected_work_place={detailedData.location}
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
              errors={errors}
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
              errors={errors}
              setCurrentCertification={setCurrentCertification}
              // fileInputRef={fileInputRef}
            />
          )}
          {step === 5 && (
            <Step5 formData={formData} errors={errors} handleChange={handleChange} />
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

            {step === 5 &&
              (
                <button
                  type="button"
                  onClick={() => setVerificationModal(true)}
                  className="px-4 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center transition duration-200 ml-auto"
                >
                  Verify <FaCheck className="ml-1" />
                </button>
              )}
          </div>
        </form>

        {verificationModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4 pt-20">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg sm:max-w-2xl md:max-w-3xl max-h-[90vh] overflow-auto">
              <h2 className="text-lg font-bold mb-4 text-center">
                Verify Your Information
              </h2>

              {errors.verificationError && (
                <p className="text-red-500 text-center mb-2">
                  {errors.verificationError}
                </p>
              )}

              <div className="max-h-96 overflow-y-auto p-2 border rounded-lg">
                <ul className="space-y-2">
                  <li>
                    <strong>Full Name:</strong> {formData.full_name}
                  </li>
                  <li>
                    <strong>Email:</strong> {formData.email}
                  </li>
                  <li>
                    <strong>Phone:</strong> {formData.phone}
                  </li>
                  <li>
                    <strong>Gender:</strong> {formData.gender}
                  </li>
                  <li>
                    <strong>Birth Date:</strong> {formData.birth_date}
                  </li>
                  
                  <li>
                    <strong>Cover Letter:</strong>{" "}
                    {formData.cover_letter || "Not Provided"}
                  </li>
                  <li>
                    <strong>Resume:</strong>{" "}
                    {formData.resume ? formData.resume.name : "Not Uploaded"}
                  </li>
                  <li>
                    <strong>Terms Accepted:</strong>{" "}
                    {formData.terms_accepted ? "Yes" : "No"}
                  </li>
                  <li>
                    <strong>Contact Consent:</strong>{" "}
                    {formData.contact_consent ? "Yes" : "No"}
                  </li>
                </ul>

                <h3 className="text-md font-semibold mt-4">Education</h3>
                <ul className="pl-4 list-disc">
                  {formData.educations.length > 0 ? (
                    formData.educations.map((edu, index) => (
                      <li key={index}>
                        {edu.education_level} in {edu.field_of_study} -{" "}
                        {edu.education_organization} ({edu.graduation_year})
                      </li>
                    ))
                  ) : (
                    <li>No education details added.</li>
                  )}
                </ul>

                <h3 className="text-md font-semibold mt-4">Work Experience</h3>
                <ul className="pl-4 list-disc">
                  {formData.experiences.length > 0 ? (
                    formData.experiences.map((exp, index) => (
                      <li key={index}>
                        {exp.job_title} at {exp.company_name} ({exp.from_date} -{" "}
                        {exp.to_date})
                        {exp.banking_experience && " [Banking Experience]"}
                      </li>
                    ))
                  ) : (
                    <li>No experience details added.</li>
                  )}
                </ul>

                <h3 className="text-md font-semibold mt-4">Certifications</h3>
                <ul className="pl-4 list-disc">
                  {formData.certifications.length > 0 ? (
                    formData.certifications.map((cert, index) => (
                      <li key={index}>
                        {cert.certificate_title} - {cert.awarding_company} (
                        {cert.awarded_date})
                      </li>
                    ))
                  ) : (
                    <li>No certifications added.</li>
                  )}
                </ul>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-1/2 mx-1"
                >
                  Verify
                </button>
                <button
                  onClick={() => setVerificationModal(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-1/2 mx-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyJob;
