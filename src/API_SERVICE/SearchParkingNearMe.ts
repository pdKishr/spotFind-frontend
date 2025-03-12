import axiosInstance from "../AXIOS_INSTANCE/api_instance"
import handleApiError from "./handleApiError";

export default async (latitude : number | null , longitude: number | null, vehicleType :string)=>{
    try{
            const response = await axiosInstance.get("/user/getParking/around-current-location",{
                params: {
                    latitude, longitude , vehicleType 
                }
            })

            return response.data;

    }
    catch(error : any){
        return handleApiError(error);
    }
}