import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { postJob } from "../services/jobsService";
import { showSuccessToast } from "../../utils/toastUtils";

const AddJob = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    jobGrade: "",
    company: "Addis Bank S.C",
    category: "",
    location: "",
    job_type: "Full-time",
    salary: "As per Companies Salary Scale",
    description: "",
    application_deadline: "",
    post_date: "",
    show_experience: true,
    details: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleDetailChange = (index, e) => {
    const updatedDetails = [...formData.details];
    updatedDetails[index][e.target.name] = e.target.value;
    setFormData({ ...formData, details: updatedDetails });
  };

  const addDetail = () => {
    setFormData({
      ...formData,
      details: [
        ...formData.details,
        { detail_type: "Responsibility", description: "" },
      ],
    });
  };

  const removeDetail = (index) => {
    const updatedDetails = formData.details.filter((_, i) => i !== index);
    setFormData({ ...formData, details: updatedDetails });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postJob(formData);
      showSuccessToast("Job Added successfully!");
      navigate("/jobs");
    } catch (error) {
      console.error(error);

      alert("Error posting job.");
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Post a Job</h2>
        <Link
          to="bulk"
          className="flex items-center justify-center text-white bg-primary px-4 py-2 rounded-lg hover:bg-blue-500 text-sm font-medium shadow-md transition duration-300 ease-in-out"
        >
          Upload Bulk
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Job Title */}
        <div>
          <label className="block text-gray-700">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Job Grade */}
        <div>
          <label className="block text-gray-700">Job Grade</label>
          <input
            type="text"
            name="jobGrade"
            value={formData.jobGrade}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-gray-700">Job Type</label>
          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        {/* Salary */}
        <div>
          <label className="block text-gray-700">Salary</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/*  */}
        <div>
          <label className="block text-gray-700">Post Date</label>
          <input
            type="date"
            name="post_date"
            value={formData.post_date}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        {/* Application Deadline */}
        <div>
          <label className="block text-gray-700">Application Deadline</label>
          <input
            type="date"
            name="application_deadline"
            value={formData.application_deadline}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        {/* Description */}
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          ></textarea>
        </div>

        {/* Display Experience Checkbox */}
        <div className="flex gap-4 col-span-2">
          <input
            type="checkbox"
            name="show_experience"
            checked={formData.show_experience}
            onChange={handleChange}
            className="p-2 border rounded-lg"
          />
          <label className="block text-gray-700">
            Should Display Experience Page?
          </label>
        </div>

        {/* Job Details Table */}
        <div className="col-span-2">
          <h3 className="text-lg font-semibold">Job Details</h3>
          <table className="w-full table-auto border-collapse mt-2">
            <thead>
              <tr>
                <th className="border p-2 text-left">Detail Type</th>
                <th className="border p-2 text-left">Description</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {formData.details.map((detail, index) => (
                <tr key={index}>
                  <td className="border p-2">
                    <select
                      name="detail_type"
                      value={detail.detail_type}
                      onChange={(e) => handleDetailChange(index, e)}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value="Responsibility">Responsibility</option>
                      <option value="Qualification">Qualification</option>
                      <option value="Skill">Skill</option>
                      <option value="Benefit">Benefit</option>
                    </select>
                  </td>
                  <td className="border p-2">
                    <input
                      name="description"
                      value={detail.description}
                      onChange={(e) => handleDetailChange(index, e)}
                      className="w-full p-2 border rounded-lg"
                    />
                  </td>
                  <td className="border text-center">
                    <button
                      type="button"
                      onClick={() => removeDetail(index)}
                      className="text-red-500"
                    >
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            onClick={addDetail}
            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 mt-2"
          >
            Add Detail
          </button>
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg  hover:bg-blue-500 transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
