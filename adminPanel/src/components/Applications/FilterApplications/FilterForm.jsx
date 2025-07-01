import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccessToast } from "../../../utils/toastUtils";
import {
  filterApplicants,
  confirmFilteredApplicants,
} from "../../services/jobsService";

const FilterForm = ({ selectedJobId, workPlace }) => {
  const navigate = useNavigate();

  const [showCriteria, setShowCriteria] = useState(false);
  const [filteredApplicants, setFilteredApplicants] = useState(0);
  const [applicants, setApplicants] = useState([]);

  const [errors, setErrors] = useState({});
  const [criteria, setCriteria] = useState({
    selectedLocation: "",
    minExperienceYears: "",
    maxExperienceYears: "",
    gender: "",
    minCGPA: "",
    minExit: "",
    program: "",
    institution: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCriteria({ ...criteria, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!criteria.selectedLocation) {
      newErrors.selectedLocation = "Location is required.";
    }
    if (criteria.minExperienceYears && isNaN(criteria.minExperienceYears)) {
      newErrors.minExperienceYears = "Experience must be a number.";
    }
    if (criteria.maxExperienceYears && isNaN(criteria.maxExperienceYears)) {
      newErrors.maxExperienceYears = "Experience must be a number.";
    }
    if (criteria.minCGPA && isNaN(criteria.minCGPA)) {
      newErrors.minCGPA = "CGPA must be a number.";
    }
    if (criteria.minExit && isNaN(criteria.minExit)) {
      newErrors.minExit = "Exit score must be a number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApplyFilter = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await filterApplicants(selectedJobId, criteria);
      if (response.length === 0) {
        setErrors({
          ...errors,
          emptyFiltered: "There Is no Applicant That Satisfies the Above Criteria",
        });
        setFilteredApplicants(0);
      } else {
        const ids = response.map((app) => app.id);
        setApplicants(ids);
        setFilteredApplicants(response.length);
        setErrors({});
        showSuccessToast("Applicants filtered successfully!");
      }
    } catch (error) {
      console.error("Filter error:", error);
    }
  };

  const handleConfirmApplicants = async () => {
    try {
      const confirmed = true;
      await confirmFilteredApplicants(selectedJobId, criteria, confirmed, applicants);

      setApplicants([]);
      setFilteredApplicants(0);
      setErrors({
        emptyFiltered: "There Is no Applicant That Satisfies the Above Criteria",
      });

      showSuccessToast("Applicants updated and criteria recorded!");
      navigate("/selected_applicants");
    } catch (error) {
      console.error("Confirmation error:", error);
    }
  };

  const handleCancel = () => {
    setShowCriteria(false);
    setCriteria({
      selectedJob: "",
      selectedLocation: "",
      minExperienceYears: "",
      maxExperienceYears: "",
      gender: "",
      minCGPA: "",
      minExit: "",
      program: "",
      institution: "",
    });
    setErrors({});
    setApplicants([]);
    setFilteredApplicants(0);
  };

  return (
    <>
      <div className="w-full border-2 border-gray-300 rounded p-2 bg-gray-300 flex justify-between items-center">
        Selection Criteria
        <button
          onClick={() => setShowCriteria(!showCriteria)}
          className="bg-primary text-white px-4 py-2 ml-2 rounded-md"
        >
          Add New Criteria
        </button>
      </div>

      {showCriteria && (
        <div>
          <form onSubmit={handleApplyFilter}>
            <div className="flex gap-2 items-center mt-4">
              <label className="font-semibold">Place of Work:</label>
              <select
                name="selectedLocation"
                value={criteria.selectedLocation}
                onChange={handleChange}
                className="border-2 border-gray-300 rounded-md w-3/4 p-2 mb-4"
              >
                <option value="">-- Select place of Work --</option>
                {workPlace.map((wplace, index) => (
                  <option key={index} value={wplace}>
                    {wplace}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md shadow">
              <div>
                <label>Min CGPA</label>
                <input
                  name="minCGPA"
                  type="text"
                  value={criteria.minCGPA}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div>
                <label>Min Exit Exam</label>
                <input
                  name="minExit"
                  type="text"
                  value={criteria.minExit}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div>
                <label>Graduation Year</label>
                <input
                  name="graduationYear"
                  type="date"
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div>
                <label>Gender</label>
                <select
                  name="gender"
                  value={criteria.gender}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                >
                  <option value="">--Select Gender--</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
              <div>
                <label>Min Experience</label>
                <input
                  name="minExperienceYears"
                  type="text"
                  value={criteria.minExperienceYears}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div>
                <label>Max Experience</label>
                <input
                  name="maxExperienceYears"
                  type="text"
                  value={criteria.maxExperienceYears}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div>
                <label>Program</label>
                <select
                  name="program"
                  value={criteria.program}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                >
                  <option value="">--Select Program--</option>
                  <option value="regular">Regular</option>
                  <option value="distance">Distance</option>
                  <option value="extension">Extension</option>
                </select>
              </div>
              <div>
                <label>Institution</label>
                <select
                  name="institution"
                  value={criteria.institution}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                >
                  <option value="">--Select Institution--</option>
                  <option value="government">Government</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
            >
              Apply Filter
            </button>
          </form>

          <div className="items-center p-4 my-4 bg-gray-100 rounded-md shadow-md text-center">
            {errors.emptyFiltered ? (
              <p className="text-red-500 text-sm mb-2">
                {errors.emptyFiltered}
              </p>
            ) : filteredApplicants > 0 ? (
              <>
                <p className="text-green-600 text-base font-medium mb-4">
                  {filteredApplicants} applicant
                  {filteredApplicants !== 1 && "s"} satisfy the selected
                  criteria.
                </p>

                <div className="flex justify-center gap-4">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={handleConfirmApplicants}
                  >
                    Confirm and Update
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterForm;
