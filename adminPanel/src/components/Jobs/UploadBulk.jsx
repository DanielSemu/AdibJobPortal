import React, { useState } from 'react';

const UploadBulk = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const templateHeaders = [
    'title',
    'job_grade',
    'company',
    'category',
    'location',
    'job_type',
    'salary',
    'description',
    'application_deadline',
  ];

  const handleDownloadTemplate = () => {
    const csvContent =
      templateHeaders.join(',') + '\n'; // CSV headers
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'upload_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="flex flex-col   min-h-[60vh] gap-6 bg-gray-50 p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">Upload Bulk Jobs</h2>
      <p>First Download job upload Template then Update it! <span className='text-red-700'> Don't Update the headers</span></p>
      <button
        onClick={handleDownloadTemplate}
        className="bg-green-600 max-w-60 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
      >
        Download Template
      </button>
    <p>Upload the Updated File</p>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="file-input file-input-bordered file-input-primary w-full max-w-md"
      />

      {selectedFile && (
        <p className="text-sm text-gray-700 mt-2">
          Selected file: <span className="font-medium">{selectedFile.name}</span>
        </p>
      )}
      <button className='max-w-36 bg-blue-600 py-2 rounded-md text-white text-xl'>Submit</button>
    </div>
  );
};

export default UploadBulk;
