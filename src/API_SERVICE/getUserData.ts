import axiosInstance from "../AXIOS_INSTANCE/api_instance"

export default async(id : number)=>{    
       try{
            const response = await axiosInstance.get("/user/get_user_details" , {params : {id:id}})
            return response.data;
         }
         catch(error:any){
             alert(JSON.stringify(error.response.data.error));
             throw error.response?.data || { message : "Something went wrong!"};       
          }
}