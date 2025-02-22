import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import LandingPage from "./FUNCTIONS/LandingPage";
import HomePage    from "./FUNCTIONS/HomePage";
import Signup      from "./FUNCTIONS/Signup";
import Signin      from "./FUNCTIONS/Signin";
import Booking     from "./FUNCTIONS/Booking";
import Profile     from "./FUNCTIONS/Profile"
import ListYourParking from "./FUNCTIONS/ListYourParking"

function App() {

  return (
    <>    
        <Router>
            <Routes>
                <Route path="/landingpage" element={<LandingPage/>} /> 
                <Route path="/homepage"    element={<HomePage/>} />    
                <Route path="/signup"      element={<Signup/>} />  
                <Route path="/signin"      element={<Signin/>} />      
                <Route path="/booking"     element={<Booking/>}/>     
                <Route path="/profile"     element={<Profile/>}/>  

                <Route path="/listYourParking"     element={<ListYourParking/>}/> 

            </Routes>
       </Router>
    
    </>
  )

}

export default App