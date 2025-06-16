// import axiosInstance from "./axiosInstance";
import axiosInstance from "../../api/axiosInstance";


export const getJobs = async () => {
  const response = await axiosInstance.get('/jobs/admin_jobs/');
  return response.data;
};
export const getExpiredJobs = async () => {
  const response = await axiosInstance.get('/jobs/expired_jobs/');
  return response.data;
};
export const getAcceptedApplicants = async () => {
  const response = await axiosInstance.get('/api/export_applicant/');
  return response.data;
};
export const exportAcceptedApplicants = async () => {
  const response = await axiosInstance.post(
    '/api/export_applicant/',
    {},
    { responseType: 'blob' } // <-- Important for downloading files
  );

  return response;
};

export const getSingleJob = async (id) => {
  const response = await axiosInstance.get(`/jobs/admin_jobs/${id}/`);
  return response.data;
};

export const updateJob = async (id, job) => {
  const response = await axiosInstance.put(`/jobs/admin_jobs/${id}/`, job);
  return response.data;
};

export const postJob = async (jobData) => {
  const response = await axiosInstance.post('/jobs/admin_jobs/', jobData);
  return response.data;
};

export const getCategories = async () => {
  const response = await axiosInstance.get('/jobs/categories/');
  return response.data;
};

export const updateCategory = async (id,data)=>{
  const response= await axiosInstance.put(`/jobs/categories/${id}/`,data);
  return response.data
}
export const createCategory = async (categoryData) => {
  const response= await axiosInstance.post('/jobs/categories/',categoryData);
  return response.data
}

export const getApplications = async () => {
  const response = await axiosInstance.get('/applications/admin_applicants/');
  return response.data;
};

export const updateApplicantStatus= async (id,status)=>{
  const response=await axiosInstance.put(`/applications/admin_applicants/${id}/`,{status})
  return response.data
}
export const getSingleApplicant = async (id) => {
  const response = await axiosInstance.get(`/applications/admin_applicants/${id}/`);
  return response.data;
};
export const getApplicantsByJob = async (id) => {
  const response = await axiosInstance.get(`/api/job/applicants/${id}/`);
  return response.data;
};

export const filterApplicants = async (criteria)=>{
  const response=await axiosInstance.post('/api/filter_applicants/', criteria)
  return response.data
}

export const confirmFilteredApplicants = async (criteria, confirm, applicant_ids) => {
  
  const response = await axiosInstance.post('/api/confirm_filter/', {
    criteria,
    confirm,
    applicant_ids
  });
  return response.data;
};


export const getUnderReviewApplicants = async ()=>{
  const response= await axiosInstance.get('/api/get_under_review_applicants/')
  return response.data
}
export const uploadBulkJobs = async (fromData)=>{
  const response= await axiosInstance.post('/api/jobs/bulk-upload/', fromData)
  return response.data
}
export const uploadBulkJobDetail = async ( id,fromData)=>{
  const response= await axiosInstance.post(`/api/jobs/job-detail-upload/${id}/`, fromData)
  return response.data
}

export const SendSMS = async (recipient, message) => {
  try {
    const response = await axiosInstance.post("/api/send-sms/", {
      recipient,
      message,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        `Unexpected response status: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("🚨 SendSMS Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.error || "Failed to send SMS. Please try again."
    );
  }
};