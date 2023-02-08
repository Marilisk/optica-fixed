import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,   //- for deploy
    //baseURL: API_URL, //- for develope
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
            const response = await axios.get(`${process.env.REACT_APP_API_URL}auth/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.tokens.accessToken);  
            //console.log('in interceptors response ', originalRequest);
            return instance.request(originalRequest); 
        } catch (error) {
            console.log('not authorised')
        }
        
    } 
    throw error;
}) 

export default instance;