import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Backicon from "../ASSETS/Backicon";
import Button from "../COMPONENTS/WhiteButton";
import NavIcon from "../COMPONENTS/NavIcon";
import Title from "../COMPONENTS/Title";
import Input from "../COMPONENTS/Input";
import AddParking from "../API_SERVICE/AddParking";
import { useParkingStore} from "../ZUSTAND_STORE/store";
import ParkingFrontCard from "../COMPONENTS/ParkingFrontCard";
import GreenButton from "../COMPONENTS/GreenButton";

export default function ListParking() {
  const navigate = useNavigate();
  const [overLay, setOverLay] = useState(false);
 
  const [parking, setParking] = useState({
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
    isAvailableFor24Hours: true, 
    openTime: "12.00", 
    closeTime: "11.59"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParking((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setParking((prev) => ({ ...prev, [name]: checked }));
  };

  const {parkings , fetchParking} = useParkingStore();
  const [fetched,setFetched] = useState(false);

  useEffect(() => {   
    if(!fetched){
      fetchParking();  
      setFetched(true)
    }
  }, [parkings]);

  useEffect(()=>{
     const token = localStorage.getItem("token");
     if(!token) navigate("/signin");
  },[navigate])


  return <>
    {/* Header */}
    <div className="max-w-full h-15 bg-green-500">
      <div className="flex justify-center">
        <div className="w-full text-center lg:w-250">
          <div className="flex justify-between items-center">
            <Title />
            <div className="flex px-2 items-center">
              <div className="text-xl text-white">List Parkings</div>
              <button onClick={() => navigate("/")}>
                <NavIcon label="" icon={<Backicon />} textColor="white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Add Parking Button */}
    <div className="p-10 flex justify-center">
      <Button buttonName="+ Add Parking Lot" onClickHandler={() => setOverLay(true)} />
    </div>
        
    <div className="flex justify-center">
        <div className="w-full lg:w-250 p-2">
        {parkings.map((p, index) => (
          <div className="" key={index} onClick={()=>{
               navigate(`/parking/${p.id}`)
          }}>
          <ParkingFrontCard k={index} parkingName={p.parkingName} location={p.location} city={p.city} /> 
          </div>  
           ))}  
      </div>
          
    </div>

    {/* Overlay*/}
    {overLay && (
      <div className="fixed inset-0 bg-slate-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-lg w-fit max-h-[90vh] overflow-y-auto">
          <div className="sm:w-100 p-4">
            {/* Parking Info Inputs */}
            <Input label="Parking Name" name="parkingName" type="text" placeholder="Enter Parking Name" onChangeHandler={handleChange} value={undefined} />
            <Input label="Parking Email" name="email" type="text" placeholder="Enter Email" onChangeHandler={handleChange} value={undefined} />
            <Input label="Parking Mobile Number" name="mobileNumber" type="text" placeholder="Enter Mobile Number" onChangeHandler={handleChange} value={undefined} />
            <Input label="Location" name="location" type="text" placeholder="Enter Location" onChangeHandler={handleChange} value={undefined} />
            <Input label="Address" name="address" type="text" placeholder="Enter Address" onChangeHandler={handleChange} value={undefined} />
            <Input label="City" name="city" type="text" placeholder="Enter City" onChangeHandler={handleChange} value={undefined} />
            <Input label="State" name="state" type="text" placeholder="Enter State" onChangeHandler={handleChange} value={undefined} />

            {/* Bike Parking */}
            <div className="p-2">
              <label className="font-bold flex items-center space-x-2">
                <input type="checkbox" name="isBikeParkingAvailable" checked={parking.isBikeParkingAvailable} onChange={handleCheckboxChange} className="w-5 h-5" />
                <span>Do you have bike parking?</span>
              </label>
            </div>

            {parking.isBikeParkingAvailable && (
              <div className="p-2 border-l-4 border-green-500">
                <Input label="No. of Bike Spots" name="noOfBikeSpots" type="number" placeholder="Enter No. of Spots" onChangeHandler={handleChange} value={undefined} />
                <Input label="Bike Parking Charge" name="bikeCharge" type="number" placeholder="Enter Charge" onChangeHandler={handleChange} value={undefined} />

              </div>
            )}

            {/* Car Parking */}
            <div className="p-2">
              <label className="font-bold flex items-center space-x-2">
                <input type="checkbox" name="isCarParkingAvailable" checked={parking.isCarParkingAvailable} onChange={handleCheckboxChange} className="w-5 h-5" />
                <span>Do you have car parking?</span>
              </label>
            </div>

            {parking.isCarParkingAvailable && (
              <div className="p-2 border-l-4 border-green-500">
                 <Input label="No. of Car Spots" name="noOfCarSpots" type="number" placeholder="Enter No. of Spots" onChangeHandler={handleChange} value={undefined} />
                 <Input label="Car Parking Charge" name="carCharge" type="number" placeholder="Enter Charge" onChangeHandler={handleChange} value={undefined} />
              </div>
            )}

            {/* Availability */}
            <div className="p-2">
              <label className="font-bold flex items-center space-x-2">
                <input type="checkbox" name="isAvailableFor24Hours" checked={parking.isAvailableFor24Hours} onChange={handleCheckboxChange} className="w-5 h-5" />
                <span>Available 24/7?</span>
              </label>
            </div>

            {!parking.isAvailableFor24Hours && (
              <div className="p-2 border-l-4 border-blue-500">
               <Input label="Opening Time" name="openTime" type="time" placeholder="HH:MM" onChangeHandler={handleChange} value={undefined} />
               <Input label="Closing Time" name="closeTime" type="time" placeholder="HH:MM" onChangeHandler={handleChange} value={undefined} />
              </div>
            )}

            {/* Back & Save Buttons */}
            <div className="flex justify-between mt-4">
              <GreenButton buttonName={"Back"} onClickHandler={()=> setOverLay(false)}/>
              <GreenButton buttonName={"Save"} onClickHandler={ async ()=>  await AddParking(parking)}/>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
}


