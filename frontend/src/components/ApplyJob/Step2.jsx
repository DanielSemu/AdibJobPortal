import React from 'react'

const Step2 = ({handleInputChange,currentEducation,formData,errors,addEntry,removeEntry,setCurrentEducation}) => {
  return (
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
  )
}

export default Step2