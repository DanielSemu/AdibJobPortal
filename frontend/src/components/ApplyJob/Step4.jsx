import React from "react";

const Step4 = ({
  handleInputChange,
  currentCertification,
  formData,
  addEntry,
  removeEntry,
  setCurrentCertification,
  fileInputRef
}) => {
  return (
    <div>
      <h1 className="text-center text-3xl mb-2 text-gray-700 font-semibold">
        Certifications/Recognitions <span className="text-xl">(Optional)</span>
      </h1>

      {/* Display Added Experiences */}
      <div className="flex flex-wrap gap-2 mt-2">
        {formData.certifications.map((cert, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-200 rounded-lg text-gray-800 text-sm"
          >
            {cert.certificate_title}{" "}
            <span
              onClick={() => removeEntry("certifications", index)}
              className="float-end text-red-600 cursor-pointer"
            >
              x
            </span>
            <br />
            {" by "} {cert.awarding_company} {" in "}
            {cert.awarded_date}
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
          name="certificate_title"
          value={currentCertification.certificate_title}
          onChange={(e) => handleInputChange("certification", e)}
          className="w-full p-2 border rounded-md focus:outline-blue-500"
        />

        <label className="block text-gray-700 font-semibold mt-1 mb-1">
          Awarding Company:
        </label>
        <input
          type="text"
          name="awarding_company"
          value={currentCertification.awarding_company}
          onChange={(e) => handleInputChange("certification", e)}
          className="w-full p-2 border rounded-md focus:outline-blue-500"
        />
        <label className="block text-gray-700 font-semibold mt-1 mb-1">
          Awarding Date:
        </label>
        <input
          type="date"
          name="awarded_date"
          value={currentCertification.awarded_date}
          onChange={(e) => handleInputChange("certification", e)}
          max={new Date().toISOString().split("T")[0]}
          className="w-full p-2 border rounded-md focus:outline-blue-500"
        />
        {/* <label className="block text-gray-700 font-semibold mb-2">
          Upload Certificate (PDF/DOCX)
        </label>
        <input
          type="file"
          name="certificate_file"
          ref={fileInputRef}
          accept=".pdf, .doc, .docx"
          onChange={(e) => handleInputChange("certification", e)}
          className="w-full p-2 border rounded-md focus:outline-blue-500"
          // required
        /> */}
        <button
          type="button"
          onClick={() =>
            addEntry(
              "certifications",
              currentCertification,
              setCurrentCertification
            )
          }
          className="mt-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Add Certificate
        </button>
      </div>
    </div>
  );
};

export default Step4;
