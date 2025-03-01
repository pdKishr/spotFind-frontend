import axiosInstance from "../AXIOS_INSTANCE/api_instance"
import handleApiError from "./handleApiError";

interface Props{
    fname : string,
    email : string,
    mobileNumber : string ,
    password : string
}

export default async({fname,email,mobileNumber,password}:Props)=>{
    
     try{
        const response = await axiosInstance.post('/auth/user/register' , {
            name : fname ,
            email,
            mobileNumber,
            password    
        });
        return response.data;
     }
     catch(error:any){
        return  handleApiError(error);      
     }

};