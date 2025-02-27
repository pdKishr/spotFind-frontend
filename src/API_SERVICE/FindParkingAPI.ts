import axiosInstance from "../AXIOS_INSTANCE/api_instance"

export default async (location : string , vehicleType :string , city : string)=>{
    try{
            const response = await axiosInstance.get("/user/getParkingByFilter",{
                params: {
                    location, vehicleType , city
                }
            })

            return response.data;

    }
    catch(error : any){
        alert("something went wrong")
        throw new error.response.data ;
    }
}