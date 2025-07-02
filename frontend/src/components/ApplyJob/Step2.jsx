/* eslint-disable react/prop-types */

const Step2 = ({
  handleInputChange,
  currentEducation,
  formData,
  errors,
  addEntry,
  removeEntry,
  setCurrentEducation,
}) => {
  return (
    <div>
      <h1 className="text-center text-3xl mb-2 text-gray-700 font-semibold ">
        Educational Background
      </h1>
      {/* Display Added Educations */}
      <div className="flex flex-wrap gap-2 mt-2">
        {formData.educations.map((edu, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-200 rounded-lg text-gray-800 text-sm"
          >
            {edu.education_level}
            {" in "}
            {edu.field_of_study} {" with CGPA "} {edu.cgpa}
            <span
              onClick={() => removeEntry("educations", index)}
              className="float-end ml-1 text-xl text-red-600 cursor-pointer"
            >
              x
            </span>
            <br /> {" from "} {edu.education_organization}
          </span>
        ))}
      </div>
      {/* Education */}
      {errors.educations && <p className="text-red-500">{errors.educations}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Highest Education */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Highest Education:
          </label>
          <select
            name="education_level"
            value={currentEducation.education_level}
            onChange={(e) => handleInputChange("education", e)}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
            required
          >
            <option value="">Select</option>
            <option value="High School">High School</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor’s Degree">Bachelor’s Degree</option>
            <option value="Master’s Degree">Master’s Degree</option>
            <option value="PhD">PhD</option>
          </select>
          {errors.education_level && (
            <p className="text-red-500 text-sm mt-1">
              {errors.education_level}
            </p>
          )}
        </div>

        {/* Field of Study */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Field of Study:
          </label>
          <input
            type="text"
            name="field_of_study"
            value={currentEducation.field_of_study}
            onChange={(e) => handleInputChange("education", e)}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
            required
          />
          {errors.field_of_study && (
            <p className="text-red-500 text-sm mt-1">{errors.field_of_study}</p>
          )}
        </div>

        {/* Graduation Year */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Graduation Year:
          </label>
          <input
            type="date"
            name="graduation_year"
            value={currentEducation.graduation_year}
            onChange={(e) => handleInputChange("education", e)}
            max={new Date().toISOString().split("T")[0]}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
            required
          />
          {errors.graduation_year && (
            <p className="text-red-500 text-sm mt-1">
              {errors.graduation_year}
            </p>
          )}
        </div>

        {/* Educational Organization */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Educational Organization:
          </label>
          <input
            type="text"
            name="education_organization"
            value={currentEducation.education_organization}
            onChange={(e) => handleInputChange("education", e)}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
            required
          />
          {errors.education_organization && (
            <p className="text-red-500 text-sm mt-1">
              {errors.education_organization}
            </p>
          )}
        </div>

        {/* Program */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Education Program:
          </label>
          <select
            name="program"
            value={currentEducation.program}
            onChange={(e) => handleInputChange("education", e)}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
            required
          >
            <option value="">Select</option>
            <option value="Regular">Regular</option>
            <option value="Distance">Distance</option>
            <option value="Extension">Extension</option>
          </select>
          {errors.program && (
            <p className="text-red-500 text-sm mt-1">{errors.program}</p>
          )}
        </div>

        {/* Institution */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Institution Type:
          </label>
          <select
            name="institution"
            value={currentEducation.institution}
            onChange={(e) => handleInputChange("education", e)}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
            required
          >
            <option value="">Select</option>
            <option value="Government">Government</option>
            <option value="Private">Private</option>
          </select>
          {errors.institution && (
            <p className="text-red-500 text-sm mt-1">{errors.institution}</p>
          )}
        </div>

        {/* CGPA */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            CGPA:
          </label>
          <input
            type="number"
            name="cgpa"
            value={currentEducation.cgpa}
            onChange={(e) => handleInputChange("education", e)}
            min={0}
            max={4.0}
            step="0.01"
            className="w-full p-2 border rounded-md focus:outline-blue-500"
            required
          />
          {errors.cgpa && (
            <p className="text-red-500 text-sm mt-1">{errors.cgpa}</p>
          )}
        </div>

        {/* Exit Exam */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Exit Exam (optional):
          </label>
          <input
            type="number"
            name="exit_exam"
            value={currentEducation.exit_exam}
            onChange={(e) => handleInputChange("education", e)}
            min={0}
            step="0.01"
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          />
          {errors.exit_exam && (
            <p className="text-red-500 text-sm mt-1">{errors.exit_exam}</p>
          )}
        </div>
      </div>

      <div className="my-4">
        <button
          type="button"
          onClick={() =>
            addEntry("educations", currentEducation, setCurrentEducation)
          }
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Add Education
        </button>
      </div>
    </div>
  );
};

export default Step2;
