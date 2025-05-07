import React from "react";

const Step3 = ({
  handleInputChange,
  currentExperience,
  formData,
  addEntry,
  removeEntry,
  errors,
  setCurrentExperience,
}) => {
  return (
    <div>
      <h1 className="text-center text-3xl mb-2 text-gray-700 font-semibold">
        Work Experience <span className="text-xl">(Optional)</span>
      </h1>

      {/* Display Added Experiences */}
      <div className="flex flex-wrap gap-2 mt-2">
        {formData.experiences.map((exp, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-200 rounded-lg text-gray-800 text-sm"
          >
            {exp.job_title}{" "}
            <span
              onClick={() => removeEntry("experiences", index)}
              className="float-end text-red-600 cursor-pointer"
            >
              x
            </span>
            <br /> {exp.company_name} - {" from "} {exp.from_date} {" to "}
            {exp.to_date} 
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
          name="job_title"
          value={currentExperience.job_title}
          onChange={(e) => handleInputChange("experience", e)}
          className="w-full p-2 border rounded-md focus:outline-blue-500"
        />
        {errors.job_title && (
            <p className="text-red-500 text-sm mt-1">{errors.job_title}</p>
          )}

        <label className="block text-gray-700 font-semibold mt-3 mb-2">
          Company Name:
        </label>
        <input
          type="text"
          name="company_name"
          value={currentExperience.company_name}
          onChange={(e) => handleInputChange("experience", e)}
          className="w-full p-2 border rounded-md focus:outline-blue-500"
        />
        {errors.company_name && (
            <p className="text-red-500 text-sm mt-1">{errors.company_name}</p>
          )}

        <label className="block text-gray-700 font-semibold mt-3 mb-2">
          Years of Experience:
        </label>
        <div className="grid sm:grid-cols-2 gap-2">
          <div className="flex">
            <label className="block text-gray-700 font-semibold mt-3 mb-2">
              from_date:
            </label>
            <input
              type="date"
              name="from_date"
              value={currentExperience.from_date}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => handleInputChange("experience", e)}
              className="w-full p-2 border rounded-md focus:outline-blue-500"
            />
          </div>
          {errors.from_date && (
            <p className="text-red-500 text-sm mt-1">{errors.from_date}</p>
          )}
          <div className="flex">
            <label className="block text-gray-700 font-semibold mt-3 mb-2">
              To:
            </label>
            <input
              type="date"
              name="to_date"
              value={currentExperience.to_date}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => handleInputChange("experience", e)}
              className="w-full p-2 border rounded-md focus:outline-blue-500"
            />
          </div>
          {errors.to_date && (
            <p className="text-red-500 text-sm mt-1">{errors.to_date}</p>
          )}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="banking_experience"
              value={currentExperience.banking_experience}
              onChange={(e) => handleInputChange("experience", e)}
              className="mr-2"
              required
            />
            <label className="block text-gray-700 font-semibold">
             Banking Experience.
            </label>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            addEntry("experiences", currentExperience, setCurrentExperience)
          }
          className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Add Experience
        </button>
      </div>
    </div>
  );
};

export default Step3;
