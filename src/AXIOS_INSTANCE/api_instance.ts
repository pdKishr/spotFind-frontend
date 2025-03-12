import axios from 'axios';

//const url = 'https://spotfind-backend-production.up.railway.app/api'
const  url = 'http://localhost:8080/api'

const axiosInstance = axios.create({
    baseURL : url,
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
                 if(error.response.status){
                       console.log(error.response)
                 }
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;