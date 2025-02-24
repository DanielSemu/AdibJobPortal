// React Frontend (ApplicantForm.jsx)
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const AppyJob1 = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    job:id,
    full_name: '',
    email: '',
    phone: '',
    gender: '',
    birth_date: '',
    contact_consent: false,
    cover_letter: '',
    resume: null,
    terms_accepted: false
  });

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
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/applicants/', formDataToSend);
      console.log(formDataToSend);
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error submitting application:', error.response?.data || error.message);
    }
  };

  return (
    <div className='main-container'>
    <form className="main-container max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Job Application Form</h2>
      
      <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Full Name" required className="w-full p-2 border mb-4" />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full p-2 border mb-4" />
      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required className="w-full p-2 border mb-4" />

      <div className="mb-4">
        <label className="mr-4">Gender:</label>
        <label className="mr-2"><input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} /> Male</label>
        <label><input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female</label>
      </div>

      <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} required className="w-full p-2 border mb-4" />

      <textarea name="cover_letter" value={formData.cover_letter} onChange={handleChange} placeholder="Cover Letter" className="w-full p-2 border mb-4"></textarea>

      <input type="file" name="resume" onChange={handleChange} accept=".pdf,.doc,.docx" className="w-full p-2 border mb-4" />

      <div className="mb-4">
        <label><input type="checkbox" name="terms_accepted" checked={formData.terms_accepted} onChange={handleChange} required /> I accept the terms and conditions</label>
      </div>

      <div className="mb-4">
        <label><input type="checkbox" name="contact_consent" checked={formData.contact_consent} onChange={handleChange} /> I consent to be contacted</label>
      </div>

      <button type="submit" className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600">Submit Application</button>
    </form>
    </div>
  );
};

export default AppyJob1;
