import axiosInstance from "../AXIOS_INSTANCE/api_instance"

interface props{
    bId : number ,
    bookingMode : string | undefined
}

export default async({bId,bookingMode}:props)=>{
    try{
        const response = await axiosInstance.post(`/parking/booking/checkout/${bookingMode}`,{},{
            headers :{ bookingid : bId}
        })
        return response.data;
    }
    catch(error : any){
            throw new error.response.data 
    }
}