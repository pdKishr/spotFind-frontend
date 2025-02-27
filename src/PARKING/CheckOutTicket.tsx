import { useNavigate, useParams } from "react-router-dom"
import Input from "../COMPONENTS/Input";
import GreenButton from "../COMPONENTS/GreenButton";
import Backicon from "../ASSETS/Backicon";
import OfflineBooking from "../API_SERVICE/OfflineBooking";
import { useCallback, useMemo, useState } from "react";
import CheckOutTicket from "../API_SERVICE/CheckOutTicket";

export interface OfflineBooking{
    mobileNumber: string;
    parkingId: number; 
    vehicleType: string ;
    vehicleNumber: string;
}

export default ()=>{

    const navigate = useNavigate();

    const {parkingId,bookingMode} = useParams();

    const [bookingId,setBookingId] = useState("");

    const numericBookingId = useMemo(
        () => Number(bookingId)       
    , [bookingId]);
   
    const [processing,setProcessing] = useState(false);

    const onClickHandler = useCallback(async ()=>{
        if(!bookingId){
            alert("Enter valid booking id");
            return;
        }

        try{
            setProcessing(true);
            const data = await CheckOutTicket({bId : numericBookingId , bookingMode});       
            setBookingId("");
            alert(data.msg);
        }catch(error : any){
            alert("falied checkout");
            console.log(error);
        }finally{
            setProcessing(false)
        }
    },[bookingId,numericBookingId,bookingMode])

    return<>
  
    <div className="flex justify-center items-center h-screen m-3">
        <div className="border-white rounded-xl shadow w-auto h-auto p-5">

                <div className="flex items-center justify-between text-green-500 py-3">
                    <div className="font-semibold ml-3 ">
                       Checkout {bookingMode} Ticket
                    </div>
                    <div className="font-bold text-xs" onClick={()=>{navigate(`/Parking/${parkingId}`)}}>
                       <Backicon/>
                    </div>
                </div>

                <div className="justify-center">
                    <div>{(processing? "loading" : <Input name="bookingId"  label={"Booking Id"} type={"text"} placeholder={"enter booking Id"} onChangeHandler={(e)=>{setBookingId(e.target.value)}} value={bookingId}></Input>
                          )}</div>
                    <div className="flex justify-center">
                    <GreenButton buttonName={"Checkout"}  onClickHandler={onClickHandler} />
                    </div> 
                </div>
        </div>

    </div>
    
    
    </>
}