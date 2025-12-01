import axios from 'axios';

const baseUrl = import.meta.env.VITE_BACKEND_BASE_API;

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers:{
        'Content-Type':'application/json',
    },
    withCredentials: true, // <-- ADD THIS LINE
});

// Request interceptor: The browser will handle the cookies automatically.
// You no longer need this interceptor to attach the Authorization header manually
/*
axiosInstance.interceptors.request.use((config) => {
    // const access_token = localStorage.getItem('access_token'); // OLD CODE
    // The browser automatically attaches the HttpOnly cookie
    return config;
}, (error) => {
    return Promise.reject(error);
});
*/

// Response interceptor:
// The 401 handling needs a slight tweak if we rely purely on cookies for refresh
axiosInstance.interceptors.response.use((response)=>{
    return response
},
// handle failed responses
async (error)=>{
    const originalRequest=error.config;
    
    // If the access token expired (401), we attempt a refresh
    if(error.response.status===401 && !originalRequest.retry){
        originalRequest.retry=true;
        
        try{
            // We call the refresh endpoint. The BROWSER automatically sends the
            // HttpOnly refresh_token cookie along with this request.
            // The Django backend reads the cookie, generates new tokens,
            // and sets NEW HttpOnly cookies in the response headers.
            const response=await axiosInstance.post('/token/refresh/', {});
            
            // The response body might contain a success message, but we don't 
            // touch localStorage or manually set headers here.
            // The browser received the new cookies from the response headers and stored them.
            
            // Now we retry the original failed request, which will use the *new* cookies
            return axiosInstance(originalRequest)

        }catch(error){
            // If refresh fails (e.g., refresh token expired or invalid), 
            // the Django backend should clear the cookies or this catch block
            // handles potential logout/redirect logic.
            // You might want to redirect to a login page here.
            console.error("Refresh failed, logging out");
            // window.location.href = '/login'; // Example of forced redirect
        }
    }  
    return Promise.reject(error);
});


export default axiosInstance;