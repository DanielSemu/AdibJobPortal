import axiosInstance from "./axiosInstance";

export const getJobs =async()=>{
    try {
        const response=await axiosInstance.get('jobs/')
        return response.data    
    } catch (error) {
        console.error(error);
        
    }
    
}
export const getCategories =async()=>{
    try {
        const response=await axiosInstance.get('categories/')
        return response.data    
    } catch (error) {
        console.error(error);
        
    }
    
}
export const getSingleJob =async(id)=>{
    const response=await axiosInstance.get(`jobs/${id}/`)
    return response.data
}

export const contactUs = async (formData) => {
    console.log("Sending Data:", formData);
    
    try {
        const response = await axiosInstance.post("contacts/", formData);
        return response;
    } catch (error) {
        if (error.response) {
            console.error("Response Data:", error.response.data);  // Log error details
            console.error("Status Code:", error.response.status);
        } else {
            console.error("Request Error:", error.message);
        }
        throw error;
    }
};
