import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getBookings from "../API_SERVICE/getBookings";
import Title from "../COMPONENTS/Title";
import NavIcon from "../COMPONENTS/NavIcon";
import Backicon from "../ASSETS/Backicon";

export interface OfflineBooking {
    id: number;
    mobileNumber: string;
    parkingId: number; 
    vehicleType: string;
    vehicleNumber: string;
    bookedAt: string;  
    isCheckOut: boolean;
    checkedOutAt?: string | null; 
}

export default () => {
    const { parkingId, bookingMode } = useParams();
    console.log(bookingMode)
    const [bookings, setBookings] = useState<OfflineBooking[]>([]); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await getBookings( Number(parkingId) , bookingMode);
                console.log(data)
                setBookings(data);
            } catch (error) {
                console.error("Failed to fetch bookings", error);
            }
        };

        if (parkingId) {
            fetchBookings();
        }
    }, [parkingId, bookingMode]); 

    return (
        <div className="">
            <div className="max-w-full h-18 sm:h-15 bg-green-500">
                             <div className="flex justify-center">
                               <div className="w-full text-center lg:w-250">
                                 <div className="flex justify-between items-center">
                                   <Title />
                                   <div className="flex px-2 items-center">
                                     <div className="text font-semibold text-white">{parkingId}</div>
                                     <button onClick={() => {navigate(`/Parking/${parkingId}`)}}>
                                       <NavIcon label="" icon={<Backicon />} textColor="white" />
                                     </button>
                                   </div>
                                 </div>
                               </div>
                             </div>
                        </div>
                <div className="p-4">
               <h2 className="text-lg font-semibold"></h2>
                
                {bookings.length<=0 
                ? 

                <div className="flex justify-center items-center h-screen">
                      No bookings 
                </div> 
                
                  :
                    <ul>
                    {bookings.map((booking) => (
                        <li key={booking.id} className="border border-white shadow  p-2 my-2 rounded">
                            <p>{booking.id}</p>
                            <p>Vehicle: {booking.vehicleType} - {booking.vehicleNumber}</p>
                            <p>Booked At: {new Date(booking.bookedAt).toLocaleString()}</p>
                            <p>Status: {booking.isCheckOut ? "Checked Out" : "Active"} </p>
                        </li>
                    ))}
                  </ul>
               }
             </div>
           
        </div>
    );
};
