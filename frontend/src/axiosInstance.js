import axios from 'axios';

const baseUrl = import.meta.env.VITE_BACKEND_BASE_API;

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers:{
        'Content-Type':'application/json',
    }
})

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
        config.headers['Authorization'] = `Bearer ${access_token}`
    }
    return config;
}, (error) => {
    return Promise.reject(error);
}
)

//Response interceptor
axiosInstance.interceptors.response.use((response)=>{
    return response
},
// handle failed responses
async (error)=>{
    const originalRequest=error.config;
    if(error.response.status===401 && !originalRequest.retry){
        originalRequest.retry=true;
        const refresh_token=localStorage.getItem('refresh_token')
        try{
            const response=await axiosInstance.post('/token/refresh/',{refresh:refresh_token});
            localStorage.setItem('access_token',response.data.acces);
            originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
            return axiosInstance(originalRequest)

        }catch(error){
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
        }
    }  
    return Promise.reject(error);
}
)


export default axiosInstance;