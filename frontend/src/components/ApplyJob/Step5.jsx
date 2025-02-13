import React from "react";

const Step5 = ({ formData, errors, handleChange }) => {
  return (
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
          onChange={handleChange}
          accept=".pdf,.doc,.docx"
          className="w-full p-2 border mb-4"
        />
      </div>
      {/* Cover Letter */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Cover Letter
        </label>
        <textarea
          name="cover_letter"
          value={formData.cover_letter}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-blue-500"
          rows="4"
        ></textarea>
      </div>

      {/* Terms and Conditions Checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          name="terms_accepted"
          value={formData.terms_accepted}
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
          name="contact_consent"
          value={formData.contact_consent}
          onChange={handleChange}
          className="mr-2"
          required
        />
        <label className="block text-gray-700 font-semibold">
          I consent to being contacted by the company for updates regarding my
          application.
        </label>
      </div>
    </div>
  );
};

export default Step5;
