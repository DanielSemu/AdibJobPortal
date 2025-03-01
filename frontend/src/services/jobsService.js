import axiosInstance from "./axiosInstance";

export const getJobs =async()=>{
    try {
        const response=await axiosInstance.get('jobs/')
        return response.data    
    } catch (error) {
        console.error(error);
        
    }
    
}
export const getSingleJob =async(id)=>{
    const response=await axiosInstance.get(`jobs/${id}/`)
    return response.data
}