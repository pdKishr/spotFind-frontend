import axiosInstance from "../AXIOS_INSTANCE/api_instance"

export default async(parkingId : Number , bookingMode : string | undefined)=>{
  try{
        const response = await axiosInstance.get(`/parking/booking/${bookingMode}`,{
            params : { parkingId }
        })
        return response.data
  }
  catch( error : any){
         throw new error.response.data
  }

}