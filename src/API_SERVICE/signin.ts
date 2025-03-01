import axiosInstance from "../AXIOS_INSTANCE/api_instance"
import handleApiError from "./handleApiError";

interface Props{
    mobileNumber : string,
    password : string
}

export default async ({mobileNumber,password}:Props)=>{

    try{
       const response = await axiosInstance.post("/auth/user/login",{
         mobileNumber ,
         password
       });

       return response.data;
    }
    catch(error:any){
      return  handleApiError(error);
   }
     
}