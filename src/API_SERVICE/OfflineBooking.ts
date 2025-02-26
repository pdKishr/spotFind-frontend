import axiosInstance from "../AXIOS_INSTANCE/api_instance"
import { OfflineBooking } from "../PARKING/OfflineTicketBooking"

export default  async({parkingId , mobileNumber , vehicleNumber , vehicleType}:OfflineBooking)=>{
    try{
        const response = await axiosInstance.post(`/parking/booking/offline-book-${vehicleType}`,{},{
            headers :{
                id : parkingId ,
                mobilenumber : mobileNumber,
                vehiclenumber : vehicleNumber
            }
        })

        return response.data ;
    }catch(error : any){
        alert(`No ${vehicleType} spots left`)
        throw error.response?.data || { message : "Something went wrong!"};    
    }
}