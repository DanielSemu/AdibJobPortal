import axiosInstance from "./axiosInstance";

export const getJobs = async () => {
  const response = await axiosInstance.get('admin_jobs/');
  return response.data;
};
export const getExpiredJobs = async () => {
  const response = await axiosInstance.get('expired_jobs/');
  return response.data;
};

export const getSingleJob = async (id) => {
  const response = await axiosInstance.get(`admin_jobs/${id}/`);
  return response.data;
};

export const updateJob = async (id, job) => {
  const response = await axiosInstance.put(`admin_jobs/${id}/`, job);
  return response.data;
};

export const postJob = async (jobData) => {
  const response = await axiosInstance.post('admin_jobs/', jobData);
  return response.data;
};

export const getCategories = async () => {
  const response = await axiosInstance.get('categories/');
  return response.data;
};

export const updateCategory = async (id,data)=>{
  const response= await axiosInstance.put(`categories/${id}/`,data);
  return response.data
}
export const createCategory = async (categoryData) => {
  const response= await axiosInstance.post('categories/',categoryData);
  return response.data
}

export const getApplications = async () => {
  const response = await axiosInstance.get('applicants/');
  return response.data;
};

export const updateApplicantStatus= async (id,status)=>{
  const response=await axiosInstance.put(`applicants/${id}/`,{status})
  return response.data
}
export const getSingleApplicant = async (id) => {
  const response = await axiosInstance.get(`applicants/${id}/`);
  return response.data;
};

export const filterApplicants = async (criteria)=>{
  const response=await axiosInstance.post('filter_applicants/', criteria)
  return response.data
}

export const confirmFilteredApplicants = async (criteria, confirm, applicant_ids) => {
  
  const response = await axiosInstance.post('confirm_filter/', {
    criteria,
    confirm,
    applicant_ids
  });
  return response.data;
};


export const getUnderReviewApplicants = async ()=>{
  const response= await axiosInstance.get('get_under_review_applicants/')
}