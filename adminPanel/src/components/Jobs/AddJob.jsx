import React, { useState } from 'react';
import axiosInstance from '../services/axiosInstance';

const AddJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    application_deadline: '',
    company: '',
    location: '',
    type: '',
    salary: '',
    description: '',
    responsibilities: [{ responsibility: '' }],
    qualifications: [{ qualification: '' }],
    skills: [{ skill: '' }],
    benefits: [{ benefit: '' }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (e, index, field) => {
    const newArray = [...formData[field]];
    newArray[index][Object.keys(newArray[index])[0]] = e.target.value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], { [Object.keys(formData[field][0])[0]]: '' }] });
  };

  const removeField = (index, field) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  
    // Convert the form data to FormData
    const formDataToSend = new FormData();
  
    // Append simple fields
    formDataToSend.append('title', formData.title);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('application_deadline', formData.application_deadline);
    formDataToSend.append('company', formData.company);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('type', formData.type);
    formDataToSend.append('salary', formData.salary);
    formDataToSend.append('description', formData.description);
  
    // Append array fields
    formData.responsibilities.forEach((responsibility, index) => {
      formDataToSend.append(`responsibilities[${index}][responsibility]`, responsibility.responsibility);
    });
  
    formData.qualifications.forEach((qualification, index) => {
      formDataToSend.append(`qualifications[${index}][qualification]`, qualification.qualification);
    });
  
    formData.skills.forEach((skill, index) => {
      formDataToSend.append(`skills[${index}][skill]`, skill.skill);
    });
  
    formData.benefits.forEach((benefit, index) => {
      formDataToSend.append(`benefits[${index}][benefit]`, benefit.benefit);
    });
  
    try {
      const response = await axiosInstance.post('jobs/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure the backend accepts this content type
        },
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Job Posting Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="number"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Application Deadline */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Application Deadline</label>
          <input
            type="date"
            name="application_deadline"
            value={formData.application_deadline}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Salary</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Responsibilities */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Responsibilities</label>
          {formData.responsibilities.map((responsibility, index) => (
            <div key={index} className="flex space-x-2 mt-2">
              <input
                type="text"
                value={responsibility.responsibility}
                onChange={(e) => handleArrayChange(e, index, 'responsibilities')}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <button
                type="button"
                onClick={() => removeField(index, 'responsibilities')}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField('responsibilities')}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Responsibility
          </button>
        </div>

        {/* Qualifications */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Qualifications</label>
          {formData.qualifications.map((qualification, index) => (
            <div key={index} className="flex space-x-2 mt-2">
              <input
                type="text"
                value={qualification.qualification}
                onChange={(e) => handleArrayChange(e, index, 'qualifications')}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <button
                type="button"
                onClick={() => removeField(index, 'qualifications')}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField('qualifications')}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Qualification
          </button>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Skills</label>
          {formData.skills.map((skill, index) => (
            <div key={index} className="flex space-x-2 mt-2">
              <input
                type="text"
                value={skill.skill}
                onChange={(e) => handleArrayChange(e, index, 'skills')}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <button
                type="button"
                onClick={() => removeField(index, 'skills')}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField('skills')}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Skill
          </button>
        </div>

        {/* Benefits */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Benefits</label>
          {formData.benefits.map((benefit, index) => (
            <div key={index} className="flex space-x-2 mt-2">
              <input
                type="text"
                value={benefit.benefit}
                onChange={(e) => handleArrayChange(e, index, 'benefits')}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <button
                type="button"
                onClick={() => removeField(index, 'benefits')}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField('benefits')}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Benefit
          </button>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;