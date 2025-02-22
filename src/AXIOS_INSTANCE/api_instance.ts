import axios from 'axios';

const axiosInstance = axios.create({
    baseURL : 'http://localhost:8080/api',
    timeout :  10000,
    headers :  {
        'Content-Type' : 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response)=> response ,
    (error)=>{
        if(error.response){
                 if(error.response.status === 401){
                        localStorage.clear();
                        window.location.href = "/signin" ;
                 }
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;