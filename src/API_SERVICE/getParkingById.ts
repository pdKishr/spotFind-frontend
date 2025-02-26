import axiosInstance from "../AXIOS_INSTANCE/api_instance"

export default async (id:number)=>{
    try{
      const response = await axiosInstance.get("/user/getparking" ,{params:{id}})
      return response.data ;
    }
    catch(error:any){
        alert(error.response.data)
        throw new error.response.data

    }
}