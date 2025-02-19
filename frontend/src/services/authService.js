import axiosInstance from "./axiosInstance";

export const login =async()=>{
    const response=await axiosInstance.get('jobs/')
    return response.data
}
export const register =async(id)=>{
    const response=await axiosInstance.get(`jobs/${id}/`)
    return response.data
}