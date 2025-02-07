import axiosInstance from "./axiosInstance";

export const getJobs =async()=>{
    const response=await axiosInstance.get('jobs/')
    return response.data
}
export const getSingleJob =async(id)=>{
    const response=await axiosInstance.get(`jobs/${id}/`)
    return response.data
}