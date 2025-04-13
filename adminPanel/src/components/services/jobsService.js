import axiosInstance from "./axiosInstance";

export const getJobs = async () => {
  const response = await axiosInstance.get('admin_jobs/');
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
export const getApplications = async () => {
  const response = await axiosInstance.get('applicants/');
  return response.data;
};

export const filterApplicants = async (criteria)=>{
  const response=await axiosInstance.post('filter_applicants/', criteria)
  return response.data
}

export const getUnderReviewApplicants = async ()=>{
  const response= await axiosInstance.get('get_under_review_applicants/')
}