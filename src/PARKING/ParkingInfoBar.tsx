import { useState } from "react";
import ParkingTemplate from "../COMPONENTS/ParkingTemplate"
import { Parking } from "../ZUSTAND_STORE/store"

interface props{
    input_parking : Parking | undefined
}

export default ({input_parking}:props)=>{

    const [availability,setAvailability] = useState(false);

    const [parking,setParking] = useState<Parking | undefined>(input_parking)
    
    
    return<>
  
    <div >
        <ParkingTemplate title="Parking Name" label={parking?.parkingName} type={"text"} />
        <ParkingTemplate title="Email" label={parking?.email} type={"text"} />
        <ParkingTemplate title="Mobile Number" label={parking?.mobileNumber} type={"text"} />
        <ParkingTemplate title="Location" label={parking?.location} type={"text"} />
        <ParkingTemplate title="Address" label={parking?.address} type={"text"} />
        <ParkingTemplate title="City" label={parking?.city} type={"text"} />
        <ParkingTemplate title="State" label={parking?.state} type={"text"} />
        <ParkingTemplate title="Bike Parking Available" label={parking?.isBikeParkingAvailable} type={"text"} />
        {
            parking?.isBikeParkingAvailable && <>
              <ParkingTemplate title="Number of Bike Spots" label={parking?.noOfBikeSpots} type={"text"} />
              <ParkingTemplate title="Bike Charge" label={parking?.bikeCharge} type={"number"} />
            </>
        }
      
        <ParkingTemplate title="Car Parking Available" label={parking?.isCarParkingAvailable} type={"text"} />
      
        {
            parking?.isCarParkingAvailable && <>
              <ParkingTemplate title="Number of Car Spots" label={parking?.noOfCarSpots} type={"number"} />
              <ParkingTemplate title="Car Charge" label={parking?.carCharge} type={"number"} />
            </>
        }
      
      <div onClick={()=>{setAvailability(true)}}>
       <ParkingTemplate title="Available 24 Hours" label={parking?.isAvailableFor24Hours} type={"text"} />
      </div>

      {
        availability && 
        <div >
        <div className="flex justify-center space-x-2">
                               <label className="font-bold">Select Vehicle</label>
                                 <div className="flex justify-bewteen ">
                                       <div className="mx-2 ">
                                          <input id="car" type="radio" value="Car"name="vehicle" className=""
                                           onChange={(e)=>{}} />
                                          <label className="mx-1" htmlFor="car">Car</label>
                                       </div>
                                       <div>
                                          <input id="bike" type="radio" value="Bike" name="vehicle" onChange={(e)=>{}}></input>
                                          <label className="mx-1" htmlFor="bike">Bike</label>
                                       </div>                                
                                 </div>                              
                            </div> 
        </div>
      }
      

        {
            ! parking?.isAvailableFor24Hours &&  <>
            <ParkingTemplate title="Opening Time" label={parking?.openTime} type={"text"} />
            <ParkingTemplate title="Closing Time" label={parking?.closeTime} type={"text"} />
            </>
        }
        
    </div>

     
    </>
}