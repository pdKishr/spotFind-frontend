import ProfileIcon   from "../ASSETS/ProfileIcon"
import Button        from "../COMPONENTS/WhiteButton"
import NavIcon       from "../COMPONENTS/NavIcon"
import Title         from "../COMPONENTS/Title"
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
import GreenButton   from "../COMPONENTS/GreenButton"
import Input from "../COMPONENTS/Input"
import ParkingTemplate from "./ParkingTemplate"
import FindParkingAPI from "../API_SERVICE/FindParkingAPI"
import { Parking } from "../ZUSTAND_STORE/store"
import HomeIcon from "../ASSETS/HomeIcon"
import BookingsIcon from "../ASSETS/BookingsIcon"
import SupportIcon from "../ASSETS/SupportIcon"
import GetUserBookings from "../API_SERVICE/GetUserBookings"
import BookingCard, { Booking } from "../COMPONENTS/BookingCard"

enum overLay {
    home ,
    bookings ,
    support
}

export default ()=>{

   const [overlay,setOverlay] = useState<overLay>(overLay.home) ;

   const navigate = useNavigate();  

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/signin")
        }
    },[])

    const [city , setCity]         = useState("");
    const [vehicle , setVehicle]   = useState("");
    const [location , setLocation] = useState("");

   
   const [parkings ,setParkings] = useState<Parking[]>();

    const handleClick = async ()=>{
        if( city === "" || vehicle ==="" || location===""){
            alert("enter valid details")
            return;
         }   
         try{
              const data = await FindParkingAPI(location,vehicle,city);
              setParkings(data)
         }
          catch(error: any){
            throw new error
         }

    }
   
   const [bookings,setBookings] = useState<Booking>();

   useEffect(()=>{
      const fetch = async()=>{
        const data = await GetUserBookings();
        setBookings(data)
        console.log(data)
      }

      fetch();
             
    },[])

       return <>


        <div className="">
     
        <div className=" fixed top-0 left-0 w-full h-15 bg-green-500">
            <div className="flex justify-center ">
                <div className="w-full text-center lg:w-250">
                    <div className="flex justify-between items-center">
                         <Title/>                                                                    
                                <div className="flex py-1">
                                <Button buttonName={"ListYourSpot"} onClickHandler={()=>{ navigate("/listYourParking")}}/>                                
                                <button onClick={()=>
                                    navigate("/profile")                                   
                                    }><NavIcon label="" icon={<ProfileIcon/>}  textColor="white"/></button>
                                </div>                                                 
                    </div>                    
                </div>
             </div>
        </div>   

        <div className="fixed top-14 left-0 h-15 bg-green-500 w-full flex justify-center" >
                 <div className="w-full text-center lg:w-250">
                       <div className="flex p-1 mx-5 justify-center">
                         
                                      <div className={overlay === overLay.home ? "bg-white" : ""} onClick={()=>{setOverlay(overLay.home)}} >
                                         <button><NavIcon textColor={overlay === overLay.home ? "green" : "white"} label={"Home"} icon={<HomeIcon/>} /></button>
                                      </div>
                                      <div className={overlay === overLay.bookings ? "bg-white" : ""} onClick={()=>{setOverlay(overLay.bookings)}}>
                                          <button><NavIcon textColor={overlay === overLay.bookings ? "green" : "white"} label={"bookings"} icon={<BookingsIcon/>}/></button>
                                      </div>
                                      <div className={overlay === overLay.support ? "bg-white" : ""} onClick={()=>{setOverlay(overLay.support)}}>
                                          <button><NavIcon textColor={overlay === overLay.support ? "green" : "white"} label={"Support"} icon={<SupportIcon/>}/></button>
                                      </div>
                       </div>    
                    </div>    
                </div>  

        </div>  
        <div className="pt-28">
            
            {
                overlay == overLay.home && <>
                           <div className="bg-gray-100  ">
                  <div className="flex justify-center">
                       <div className="w-full  text-center text-2xl lg:text-4xl lg:w-260 my-4">
                        <div className="font-semibold">Book your Parking Spot Now </div> 
                              <div className="text-sm">
                                        <div className="flex justify-center">
                                           <div className="w-1/2  justify-start">
                                           <Input label="Search city" name="city" type="text" placeholder="Bengaluru" onChangeHandler={(e) => {
                                             setCity(e.target.value)
                                         }} value={city}/>
                                         </div>
                                       
                                           <div className="w-1/2">
                                        <Input label="Enter Location" name="location" type="text" placeholder="NearBy Location" onChangeHandler={(e) => {
                                       setLocation(e.target.value)
                                   }} value={location}/>   
                                         </div>
                                        </div>      
                                                                         
                                  <div className="flex justify-center space-x-2">
                                      <label className="font-bold">Select Vehicle</label>
                                        <div className="flex justify-bewteen ">
                                              <div className="mx-2 ">
                                                 <input id="car" type="radio" value="Car" name="vehicle" className=""
                                                  onChange={(e)=>{setVehicle(e.target.value)}} />
                                                 <label className="mx-1" htmlFor="car">Car</label>
                                              </div>
                                              <div>
                                                 <input id="bike" type="radio" value="Bike" name="vehicle" onChange={(e)=>{setVehicle(e.target.value)}}></input>
                                                 <label className="mx-1" htmlFor="bike">Bike</label>
                                              </div>                                
                                        </div>                              
                                   </div>                            
                               </div>                            
                           </div>
                       </div>
                    </div>
       
                    <div className="bg-gray-100 h-18">                     
                           <div className="flex justify-center">                               
                               <GreenButton buttonName={"Search"} onClickHandler={handleClick} />           
                           </div>                         
                    </div>
           

             <div className="flex justify-center max-h-screen ">
              
                    <div className=" w-full text-center lg:w-250">
                  
                        { parkings && <>   
                        {parkings.map((parking)=>(           
                              <div key={parking.id} className="flex justify-center"
                                onClick ={()=> navigate(`/getparking/${parking.id}/${vehicle}`)}
                              ><ParkingTemplate parking={parking} vehicle ={vehicle} />     </div>                    
                        ))}         
                        </>}
                    </div>    
                </div>   
                </>
            }

            {overlay === overLay.bookings && <>
               
               <div className="flex flex-col justify-center">
                      
                      { bookings && bookings.map((booking)=>(
                                 <BookingCard key={booking.id} booking={booking} />
                      ))}
                   
               </div>
            
            </>}

            {overlay === overLay.support && <>                
            <div className="flex flex-col justify-center items-center h-screen ">
                <div className="bg-white shadow-md rounded-lg p-4 border border-gray-300 max-w-md mx-auto">
                    <h2 className="text-xl font-semibold text-center mb-4">Write to Us</h2>

                    <p className="text-gray-600 text-center mb-4">Need help? Reach out to us via Email or Message.</p>

                    <div className="flex flex-col space-y-3">
                        <a href="mailto:puruthdk@gmail.com" className="w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition">
                            📧 Contact via Email
                        </a>
                        
                        <a href="sms:+91 9566335247" className="w-full text-center bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition">
                            📩 Send a Message
                        </a>
                     </div>
                </div>
            </div>
            </>}

            </div> 
                       
       </>
}