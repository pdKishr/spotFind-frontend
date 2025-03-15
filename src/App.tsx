

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import HomePage    from "./USER/HomePage";
import Signup      from "./USER/Signup";
import Signin      from "./USER/Signin";
import Booking     from "./PARKING/Booking";
import Profile     from "./USER/Profile"
import ListYourParking from "./PARKING/ListYourParking"
import Parking         from "./PARKING/Parking";
import OfflineBikeTicketBooking from "./PARKING/OfflineTicketBooking";
import CheckOutTicket           from "./PARKING/CheckOutTicket";
import GetParking from "./USER/GetParking";

function App() {

  return (
    <>    
        <Router>
            <Routes>
                
                <Route path="/"            element={<HomePage/>} />  
                <Route path="/homepage"    element={<HomePage/>} />    
                <Route path="/signup"      element={<Signup/>} />  
                <Route path="/signin"      element={<Signin/>} />                      
                <Route path="/profile"     element={<Profile/>}/>  
                <Route path="/getparking/:id/:vehicleType" element={<GetParking/>} />

                <Route path="/listYourParking"                            element={<ListYourParking/>}/> 
                <Route path="/parking/:id"                                element={<Parking/>} />
                <Route path="/bookOfflineTicket/:id/:vehicle"             element={<OfflineBikeTicketBooking/>}/> 
                <Route path="/CheckOutTicket/:parkingId/:bookingMode"     element={<CheckOutTicket/>}/> 
                <Route path="/getBookings/:parkingId/:bookingMode"        element={<Booking/>}/>  
                
            </Routes>
       </Router>
    
    </>
  )

}

export default App