import axios from "axios";

export const API_URL = 'https://backend-optics-production.up.railway.app'

const instance = axios.create({
    //baseURL: 'https://backend-optics-without-packlo.onrender.com',  
    //baseURL: 'https://backend-optics.vercel.app',  
    baseURL: 'https://backend-optics-production.up.railway.app',  
    withCredentials: true,    
})

instance.interceptors.request.use( (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})


instance.interceptors.response.use( (config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401  
            && error.config && !error.config._isRetry ) { 
        originalRequest._isRetry = true;
        try {
            //const response = await axios.get(`${API_URL}auth/refresh`, { withCredentials: true });
            const response = await axios.get(`https://backend-optics-production.up.railway.app/auth/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.tokens.accessToken);  
            return instance.request(originalRequest); 
        } catch (error) {
            console.log('not authorised')
        }
        
    } 
    throw error;
}) 

export default instance;