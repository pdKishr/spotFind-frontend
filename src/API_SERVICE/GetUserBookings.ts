import axiosInstance from "../AXIOS_INSTANCE/api_instance"

export default async()=>{
    const id = Number(localStorage.getItem("id"))
     try{
        const data = await axiosInstance.get("/user/booking/get-booking" , {params :{
            id
        }})
        return data.data;
     }catch(error:any){
        throw new error.data.data;
     }
}