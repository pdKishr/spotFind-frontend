import axiosInstance from "../AXIOS_INSTANCE/api_instance"

export interface Parking {
    parkingName: string;
    email: string; 
    mobileNumber: string; 
    location: string;
    address: string;
    city: string;
    state: string;
    isBikeParkingAvailable: boolean;
    noOfBikeSpots: number;
    bikeCharge: number;
    isCarParkingAvailable: boolean;
    noOfCarSpots: number;
    carCharge: number;
    isAvailableFor24Hours: boolean;
    openTime: string;
    closeTime: string;
  }

export default async (Props:Parking)=>{
    try{
        const id = Number(localStorage.getItem("id"));
        const response = await axiosInstance.post("/parking/register" , Props , {params:{id}});
        return response.data;
    }
    catch(error:any){
        alert(JSON.stringify(error.response.data.error));
        throw error.response?.data || { message : "Something went wrong!"};
    }
}