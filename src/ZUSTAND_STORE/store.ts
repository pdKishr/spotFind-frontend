import { create } from "zustand";
import UserGetData from "../API_SERVICE/getUserData";
import getMyParkingList from "../API_SERVICE/getMyParkingList";
import { persist } from "zustand/middleware";
import FindParkingAPI from "../API_SERVICE/FindParkingAPI";

interface User {
   name : string,
   mobileNumber : string,
   email : string,
}

interface UserState{
      user : User | null,
      fetchUser :()=> Promise<void>;
}

export const useUserStore = create<UserState>((set)=>({
  user : null,
  fetchUser : async()=>{
    const id = Number(localStorage.getItem("id")) || 0;
    const data = await UserGetData(id);
    set({user:data});
  }
 
}))

export interface Parking {
    id : number
    parkingName: string ,
    email: string, 
    mobileNumber: string, 
    location: string, 
    address: string, 
    city: string, 
    state: string,
    isBikeParkingAvailable: boolean, 
    noOfBikeSpots: number, 
    bikeCharge: number,
    isCarParkingAvailable: boolean, 
    noOfCarSpots: number 
    carCharge: number,
    isAvailableFor24Hours: boolean, 
    openTime: string, 
    closeTime: string,
    availableBikeSpots : number,
    availableCarSpots : number,
}

interface ParkingState{
  parkings : Parking[],
  fetchParking :()=> Promise<void>;
}

export const useParkingStore = create<ParkingState>()(
  persist(
    (set) => ({
      parkings: [],
      fetchParking: async () => {
        const data = await getMyParkingList();
        set({ parkings: data });
      },
    }),
    {
      name: "parking-storage", 
    }
  )
);

interface props {
  location : string ,
  city : string ,
  vehicle : string
}

interface ParkingStateSearchResult{
  parkings : Parking[],
  fetchParking :({location , vehicle , city}:props)=> Promise<void>;
}

export const useParkingStoreSearchResult = create<ParkingStateSearchResult>()(
  persist(
    (set) => ({
      parkings: [],
      fetchParking: async ({location,vehicle,city}:props) => {
        const data = await FindParkingAPI(location , vehicle, city);
        set({ parkings: data });
      },
    }),
    {
      name: "parking-search-result", 
    }
  )
);







