import axiosInstance from "../AXIOS_INSTANCE/api_instance"

interface Props{
    mobileNumber : string,
    password : string
}

export default async ({mobileNumber,password}:Props)=>{
    try{
       const response = await axiosInstance.post("/auth/user/login",{},{
          headers :{
            mobilenumber : mobileNumber ,
            password : password
          }
       })
       return response.data;
    }
    catch(error:any){
        alert(JSON.stringify(error.response.data.error));
        throw error.response?.data || { message : "Something went wrong!"};       
     }
}