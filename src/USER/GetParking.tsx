import { useNavigate, useParams } from "react-router-dom"
import Backicon from "../ASSETS/Backicon"
import NavIcon from "../COMPONENTS/NavIcon"
import Title from "../COMPONENTS/Title"
import { useCallback, useEffect, useState } from "react"
import { Parking } from "../ZUSTAND_STORE/store"
import getParkingById from "../API_SERVICE/getParkingById"
import GreenButton from "../COMPONENTS/GreenButton"
import ParkingCard from "../COMPONENTS/ParkingCard"
import Input from "../COMPONENTS/Input"
import OnlineBooking from "../API_SERVICE/OnlineBooking"
import LoadinIcon from "../ASSETS/LoadinIcon"

export default ()=>{

    const navigate = useNavigate()
    const { id , vehicleType } = useParams();
    const vehicle = String(vehicleType?.toLowerCase()) ;
    const parkingId: number = Number(id);

    const [parking, setParking] = useState<Parking>({
        id: 0,
        parkingName: "",
        email: "",
        mobileNumber: "",
        location: "",
        address: "",
        city: "",
        state: "",
        isBikeParkingAvailable: false,
        noOfBikeSpots: 0,
        bikeCharge: 0,
        isCarParkingAvailable: false,
        noOfCarSpots: 0,
        carCharge: 0,
        isAvailableFor24Hours: false,
        openTime: "",
        closeTime: "",
        availableBikeSpots: 0,
        availableCarSpots: 0
    });

     useEffect(() => {
            async function fetchParking() {
                try {
                    const data: Parking = await getParkingById(parkingId);
                    setParking(data);
                } catch (error) {
                    console.error("Error fetching parking details:", error);
                }
            }
            fetchParking();
        }, [parkingId]);

    const [vehicleNumber ,setVehicleNumber] = useState("");
    const [vehicleNumberEmpty , setVehicleNumberEmpty] = useState(false);
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);

    const handleClick = useCallback( async ()=>{
        setLoading(true);
        setError("");
        setVehicleNumberEmpty(false)

        try{
        if(vehicleNumber === "" ){
            setVehicleNumberEmpty(true)
            return;
        }

        const data =  await OnlineBooking({vehicle,vehicleNumber,parkingId});
        if(data.error) setError(data.error);
        else navigate("/")
    }catch(error){
        setError("Something went wrong. Please try again!");
    }finally{
        setLoading(false);
        
    }

    },[vehicleNumber])

   
    return<>
     <div className="fixed top-0 left-0 w-full">
        <div className="max-w-full h-18 sm:h-15 bg-green-500">
            <div className="flex justify-center">
                <div className="w-full text-center lg:w-250">
                    <div className="flex justify-between items-center">
                        <Title />
                        <div className="flex px-2 items-center">
                            <div className="text font-semibold text-white">{parking ? parking.parkingName : "ParkingName"}</div>
                            <button onClick={() => { navigate("/") }}>
                                <NavIcon label="" icon={<Backicon />} textColor="white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
       <div className="flex flex-col justify-center items-center h-screen">   
{loading ? <LoadinIcon/> :
            <div>
            <ParkingCard  parking={parking}/>
            <Input label={""} placeholder={"Vehicle Number Here"} onChangeHandler={(e)=>{setVehicleNumber(e.target.value)}} name={"vehicleNumber"} value={vehicleNumber}/>       
            {vehicleNumberEmpty && <div className="mx-10 py-0 text-sm text-red-500 flex justify-center">{"Vehicle Number is required!"}</div>}
            {error && <div className="mx-10 py-0 text-sm text-red-500 flex justify-center">{error}</div>}
         
            <div className="flex justify-center">  
            <GreenButton buttonName={"Book Now"} onClickHandler={handleClick}/>
            </div>
            </div>
}
        </div>

    </>
}