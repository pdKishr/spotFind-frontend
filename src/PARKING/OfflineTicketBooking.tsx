import { useNavigate, useParams } from "react-router-dom"
import Input from "../COMPONENTS/Input";
import { useCallback, useState } from "react";
import GreenButton from "../COMPONENTS/GreenButton";
import Backicon from "../ASSETS/Backicon";
import OfflineBooking from "../API_SERVICE/OfflineBooking";

export interface OfflineBooking{
    mobileNumber: string;
    parkingId: number; 
    vehicleType: string ;
    vehicleNumber: string;
}
  

export default ()=>{

    const navigate = useNavigate();

    const {id , vehicle} = useParams();
   
    const [booking,setBooking] = useState<OfflineBooking>({     
        mobileNumber: "",
        parkingId: Number(id),
        vehicleType: String(vehicle),
        vehicleNumber: "",
    });

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const {name , value} = e.target ;
        setBooking((prev)=>({...prev , [name]:value}))
    }

    const [processing,setProcessing] = useState(false);

    const onClickHandler = useCallback(async ()=>{
        if(!booking.mobileNumber || !booking.vehicleNumber)  {
            alert("fields should not be empty");
            return
        }
        try{                  
            setProcessing(true);
            await OfflineBooking(booking) ;
            alert("booking sucessful");
            setBooking((prev) => ({
                ...prev,
                mobileNumber: "",
                vehicleNumber: "",
            }));
                
        }
        catch(error :any){
           console.error("Booking failed: ,"+error);
           alert("Failed to book ticket");
        }
        finally{ 
             setProcessing(false);
        }
        
    },[booking])


    return<>
  
    <div className="flex justify-center items-center h-screen m-3">
        <div className="border-white rounded-xl shadow w-auto h-auto p-5">

                <div className="flex items-center justify-between text-green-600 py-3">
                    <div className="font-semibold ml-3 ">
                       Generate {vehicle} Ticket
                    </div>
                    <div className="font-bold text-xs" onClick={()=>{navigate(`/Parking/${id}`)}}>
                       <Backicon/>
                    </div>
                </div>

                <div className="justify-center">
               {
                processing ? "loading" :
                <div>
                <Input name="mobileNumber" type={"text"} label={"Mobile Number"} placeholder={"enter mobile number"} onChangeHandler={handleChange} value={booking.mobileNumber}></Input>
                <Input name="vehicleNumber" type={"text"} label={"vehicle Number"} placeholder={"enter vehicle number"} onChangeHandler={handleChange} value={booking.vehicleNumber}></Input>
               </div>
               }
                 
                    <div className="flex justify-center">
                    <GreenButton buttonName={"Book Ticket"}  onClickHandler={onClickHandler} />
                    </div> 
                </div>
        </div>

    </div>
    
    
    </>
}


