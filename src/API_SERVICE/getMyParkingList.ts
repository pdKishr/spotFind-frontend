import axiosInstance from "../AXIOS_INSTANCE/api_instance";

export default async()=>{
    try{
        const id = Number(localStorage.getItem("id"))
         const response = await axiosInstance.get("/parking/getAllParkingById",{
            params :{id}
         });
        
         return response.data;
    }
    catch(error:any){
        alert(JSON.stringify(error.response.data.error));
        throw error.response?.data || { message : "Something went wrong!"};
    }
}