/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Step5 = ({ formData, setFormData, errors, handleChange, selected_work_place }) => {
  const [location, setLocation] = useState([]);

  useEffect(() => {
    if (selected_work_place) {
      const locationsArray = selected_work_place.split(",").map((loc) => loc.trim()); // optional trim
      setLocation(locationsArray);
    }
  }, [selected_work_place]); // <== Depend on selected_work_place only

  const handleApplicationEducationChange = (index) => {
    const updatedEducations = formData.educations.map((edu, i) => ({
      ...edu,
      user_for_application: i === index, // only selected one is true
    }));
    setFormData({ ...formData, educations: updatedEducations });
  };

  return (
    <div>
      <h1 className="text-center text-3xl mb-2 text-gray-700 font-semibold ">
        Additional Information
      </h1>
      <div className="flex flex-col md:flex-row md:space-x-6 items-center mt-3 mb-4 gap-x-14">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Select Work Place:
          </label>
          <select
            name="selected_work_place"
            value={formData.selected_work_place}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
            required
          >
            light
            {location.map((loc, key) => (
              <option key={key} value={loc}>{loc}</option>
            ))}

          </select>
          {errors.selected_work_place && <p className="text-red-500">{errors.selected_work_place}</p>}
        </div>
        <div >
          <label className="block text-gray-700 font-semibold mb-2">
            Select Application Education:
          </label>
          <select
            name="user_for_application"
            value={
              formData.educations.findIndex((edu) => edu.user_for_application === true)
            }
            onChange={(e) => handleApplicationEducationChange(Number(e.target.value))}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
            required
          >
            <option value="">-- Select Education --</option>
            {formData.educations.map((edu, index) => (
              <option key={index} value={index}>
                {edu.field_of_study}
              </option>
            ))}
          </select>

          {errors.selected_work_place && <p className="text-red-500">{errors.selected_work_place}</p>}
        </div>
      </div>

      {/* Resume Upload */}
      <div>
        {errors.resume && (
          <p className="text-red-500">{errors.resume}</p>
        )}
        <label className="block text-gray-700 font-semibold mb-2">
          Upload Resume (PDF)
        </label>
        <input
          type="file"
          name="resume"
          onChange={handleChange}
          accept=".pdf"
          className="w-full p-2 border mb-4"
          required
        />
      </div>
      {/* Cover Letter */}
      <div>
        {errors.cover_letter && (
          <p className="text-red-500">{errors.cover_letter}</p>
        )}
        <label className="block text-gray-700 font-semibold mb-2">
          Cover Letter
        </label>
        <textarea
          name="cover_letter"
          value={formData.cover_letter}
          onChange={handleChange}
          placeholder="Cover Letter"
          className="w-full p-2 border rounded-md focus:outline-blue-500"
          rows="4"
          required
        ></textarea>
      </div>

      {/* Terms and Conditions Checkbox */}
      {errors.terms_accepted && (
        <p className="text-red-500">{errors.terms_accepted}</p>
      )}
      {errors.contact_consent && (
        <p className="text-red-500">{errors.contact_consent}</p>
      )}
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
          <Link to='/terms_conditions' className="text-blue-600 cursor-pointer">
            Terms and Conditions
          </Link>
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
