import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { uploadBulkJobDetail } from "../services/jobsService";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { useNavigate } from "react-router-dom";
const UploadJobDetail = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate=useNavigate()


  const handleDownloadTemplate = () => {
    const link = document.createElement("a");
    link.href = "/templates/job_detail_upload_template.csv"; // Now this will work!
    link.setAttribute("download", "job_detail_upload_template.csv");
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
      const res = await uploadBulkJobDetail(id,formData)
      showSuccessToast(res.message)
      navigate(`/detail/${id}`)
    } catch (error) {
      console.error(error);
      showErrorToast(error.response?.data?.error || "Error uploading file.")
    }
  };
  

  return (
    <div className="flex flex-col   min-h-[60vh] gap-6 bg-gray-50 p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">Upload Bulk Jobs Details</h2>
      <p>
        First Download job Detail Upload Template then Update it!{" "}
        <span className="text-red-700"> Don't Update the headers</span>
      </p>
      <button
        onClick={handleDownloadTemplate}
        className="bg-green-600 max-w-60 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
      >
        Download Template
      </button>
      <div className="p-4 ">
        <h2 className="text-2xl font-bold mb-4">Upload Jobs Detail CSV</h2>
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

export default UploadJobDetail;
