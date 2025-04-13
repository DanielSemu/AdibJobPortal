import React, { useState } from "react";
import axios from "axios";
// import excelFile from '../../assets/upload_template.xlsx'
const UploadBulk = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");


  const handleDownloadTemplate = () => {
    const link = document.createElement("a");
    link.href = "/templates/upload_template.csv"; // Now this will work!
    link.setAttribute("download", "upload_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/jobs/bulk-upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(res.data.message);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || "Error uploading file.");
    }
  };

  return (
    <div className="flex flex-col   min-h-[60vh] gap-6 bg-gray-50 p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">Upload Bulk Jobs</h2>
      <p>
        First Download job upload Template then Update it!{" "}
        <span className="text-red-700"> Don't Update the headers</span>
      </p>
      <button
        onClick={handleDownloadTemplate}
        className="bg-green-600 max-w-60 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
      >
        Download Template
      </button>
      <div className="p-4 ">
        <h2 className="text-2xl font-bold mb-4">Upload Jobs CSV</h2>
        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept=".xlsx,.csv"
            onChange={handleFileChange}
            className="mb-4"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Upload
          </button>
        </form>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default UploadBulk;
