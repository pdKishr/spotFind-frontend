export interface Booking {
    map(arg0: (b: any) => any): import("react").ReactNode;
    id: number;
    parkingName: string;
    parkingAddress: string;
    city: string;
    state: string;
    userName: string;
    vehicleType: string;
    vehicleNumber: string;
    bookedAt: string; // ISO date string
    checkedAtOut: string | null;
    isCheckOut: boolean;
  }

  interface props {
    booking : Booking
  }
  
export default ({booking} : props)=>{

    return<>
<div className="p-3">


 <div className="bg-white shadow-md rounded-lg p-4 border border-gray-300 max-w-md mx-auto">
    <div className="mb-2">
        <p className="text-lg font-semibold">Ticket Number: <span className="font-normal">{booking.id}</span></p>
    </div>

    <div className="border-t border-gray-300 pt-2">
        <p className="text-lg font-semibold">Parking Details</p>
        <p className="text-gray-700">{booking.parkingName}</p>
        <p className="text-gray-500">{booking.parkingAddress}, {booking.city}, {booking.state}</p>
    </div>

    <div className="border-t border-gray-300 pt-2">
        <p className="text-lg font-semibold">User Details</p>
        <p className="text-gray-700">{booking.userName}</p>
    </div>

    <div className="border-t border-gray-300 pt-2">
        <p className="text-lg font-semibold">Vehicle Details</p>
        <p className="text-gray-700">Type: {booking.vehicleType}</p>
        <p className="text-gray-700">Number: {booking.vehicleNumber}</p>
    </div>

    <div className="border-t border-gray-300 pt-2">
        <p className="text-lg font-semibold">Booking Status</p>
        <p className="text-gray-700">Booked At: {new Date(booking.bookedAt).toLocaleString()}</p>
        <p className={`text-sm font-medium ${booking.isCheckOut ? "text-green-500" : "text-red-500"}`}>
            {booking.isCheckOut ? `Checked Out At: ${new Date(booking.checkedAtOut!).toLocaleString()}` : "Not Checked Out"}
        </p>
    </div>
</div>

</div> 
    </>
}