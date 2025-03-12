import ProfileIcon   from "../ASSETS/ProfileIcon"
import Button        from "../COMPONENTS/WhiteButton"
import NavIcon       from "../COMPONENTS/NavIcon"
import Title         from "../COMPONENTS/Title"
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
import GreenButton   from "../COMPONENTS/GreenButton"
import Input from "../COMPONENTS/Input"
import ParkingTemplate from "./ParkingTemplate"
import {  useParkingStoreSearchResult } from "../ZUSTAND_STORE/store"
import HomeIcon from "../ASSETS/HomeIcon"
import BookingsIcon from "../ASSETS/BookingsIcon"
import SupportIcon from "../ASSETS/SupportIcon"
import GetUserBookings from "../API_SERVICE/GetUserBookings"
import BookingCard, { Booking } from "../COMPONENTS/BookingCard"
import ParkingIcon from "../ASSETS/ParkingIcon"
import LoadinIcon from "../ASSETS/LoadinIcon"
import useGeolocation from "../GEO_LOCATION_HOOK/useGeolocation"
import WhiteButton from "../COMPONENTS/WhiteButton"

enum overLay {
    home ,
    parkings ,
    bookings ,
    support ,
    authenticationRequired
}

export default ()=>{
    
   const token = localStorage.getItem("token");
   const {latitude , longitude , accuracy} = useGeolocation();
   console.log("lat "+latitude+"  long "+longitude+"   acc"+ accuracy)

   const [overlay,setOverlay] = useState<overLay>(overLay.home) ;

   const navigate = useNavigate();  

    const city = "Bangalore";
   // const [city , setCity]         = useState("");
    const [vehicle , setVehicle]   = useState("");
    const [location , setLocation] = useState("");

  //  const [isCityEmpty,setIsCityEmpty] = useState(false);
    const [isVehicleEmpty,setIsVehicleEmpty] = useState(false);
    const [isLocationEmpty,setIsLocationEmpty] = useState(false);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");


   const {parkings , fetchParking , fetchParking2} = useParkingStoreSearchResult();
   
   const [searchButtonClicked , setSearchButtonClicked] = useState(false);

    const handleClick = async ()=>{
        setLoading(true)
        setError("");
        setSearchButtonClicked(true);
        setIsLocationEmpty(false);
      //  setIsCityEmpty(false);
        setIsVehicleEmpty(false);

   
        try{
          

            if( /* city =="" ||*/ location==="" || vehicle ===""){
             //   if(trimmedCity==="") setIsCityEmpty(true);
                if(location==="") setIsLocationEmpty(true);
                if(vehicle==="") setIsVehicleEmpty(true);
                return;
            }

            localStorage.setItem("vehicle",vehicle)
             
            await fetchParking({location,vehicle,city});  
            setOverlay(overLay.parkings);                      
        }catch(error:any){
            setError("Something went wrong please try again later");
        }
        finally{
            setLoading(false);        
        }
           
         
    }

   
   const clickHandler_Of_FindParkingLotNearMe_Button = async ()=>{
    setLoading(true)
    setError("");
    setSearchButtonClicked(true);
    setIsVehicleEmpty(false);

    try{
           
           
            if(vehicle==="") {
                setIsVehicleEmpty(true);
                return;
                }

        localStorage.setItem("vehicle",vehicle)
         
        await fetchParking2({latitude,longitude,vehicle});  
        setOverlay(overLay.parkings);                      
    }catch(error:any){
        setError("Something went wrong please try again later");
    }
    finally{
        setLoading(false);        
    }

           
   }

   
   const [bookings,setBookings] = useState<Booking[]>();
   
   useEffect(()=>{
     if(token){
        const fetch = async()=>{
            const data = await GetUserBookings();
            setBookings(data)
          }
    
          fetch();
     }
      
             
    },[])

    console.log(parkings)

       return <>


        <div className="">
     
        <div className="fixed top-0 left-0 w-full h-auto  bg-green-500">
            <div className="flex justify-center ">
                <div className="w-full text-center lg:w-250">
                    <div className="flex justify-between items-center mr-1">
                               <Title/>  

                                <div className="flex py-1">
                                    <Button buttonName={"ListYourSpot"} onClickHandler={()=>{ 
                                       if (!token || token === "null") {
                                        setOverlay(overLay.authenticationRequired);
                                        return;
                                    }
                                    
                                        navigate("/listYourParking")
                                            
                                    }}/> 

                                    <button onClick={()=>{
                                       if (!token || token === "null") {
                                        setOverlay(overLay.authenticationRequired)
                                        return;
                                    }
                                    
                                        navigate("/profile")
                                                                          
                                    }}><NavIcon label={``} textColor={"white"} icon={<ProfileIcon/>} /></button>
                                </div>                                                 
                    </div>                    
                </div>
             </div>
        </div>   

        <div className="fixed bottom-0 left-0 p-1 h-auto sm:top-14 sm:left-0 sm:h-12 bg-green-500 w-full flex justify-center" >
                 <div className="w-full text-center items-center lg:w-250">
                       <div className="flex  mx-5 justify-evenly sm:justify-center">
                         
                         
                                     <div className={overlay === overLay.home ? "bg-green-700 sm:rounded rounded-xl  w-fit h-8 flex justify-center sm:w-fit sm:h-auto sm:mx-2" : "sm:mx-2"} onClick={()=>{
                                       
                                       setOverlay(overLay.home)
                                        }}>
                                         <button><NavIcon textColor={"white"} label={"Home"} icon={<HomeIcon/>} /></button>                                   
                                      </div>
                        
                                     
                                      <div className={overlay === overLay.parkings ? "bg-green-700 sm:rounded rounded-xl  w-fit h-8 flex justify-center sm:w-fit sm:h-auto  sm:mx-2" : " sm:mx-2"} onClick={()=>{
                                        if (!token || token === "null") {
                                            setOverlay(overLay.authenticationRequired)
                                            return;
                                        }
                                        
                                        setOverlay(overLay.parkings)
                                        }}>
                                          <button><NavIcon textColor={"white"} label={"Spots"} icon={<ParkingIcon/>}/></button>
                                          
                                      </div>

                                      <div className={overlay === overLay.bookings ? "bg-green-700 sm:rounded rounded-xl  w-fit h-8 flex justify-center sm:w-fit sm:h-auto   sm:mx-2" : "sm:mx-2"} onClick={()=>{
                                         if (!token || token === "null") {
                                            setOverlay(overLay.authenticationRequired)
                                            return;
                                        }
                                        
                                        setOverlay(overLay.bookings)
                                        }}>
                                          <button><NavIcon  textColor={"white"} label={"Tickets"} icon={<BookingsIcon/>}/></button>
                                      </div>

                                      <div className={overlay === overLay.support ? "bg-green-700 sm:rounded rounded-xl  w-fit h-8 flex justify-center sm:w-fit sm:h-auto   sm:mx-2" : "sm:mx-2"} onClick={()=>{setOverlay(overLay.support)}}>
                                          <button><NavIcon textColor={"white"} label={"Help"} icon={<SupportIcon/>}/></button>
                                      </div>
                       </div>    
                    </div>    
                </div>  

        </div>  
                  
            {overlay == overLay.home && 
            <>
                <div>
                  <div className="flex justify-center items-center h-screen">
                       <div className="w-full  text-center text-2xl lg:text-4xl lg:w-260 my-4">
                        <div className="font-semibold p-2">Book your Parking Spot in Bengaluru</div> 
                              <div className="text-sm">  
                              <div className=" p-1.5 flex justify-center space-x-2 my-2">
                                        <label className="font-bold">Select Vehicle</label>
                                        <div className="flex justify-bewteen ">
                                                <div className="mx-2 ">
                                                    <input id="car" type="radio" value="Car" name="vehicle" className=""   onChange={(e)=>{setVehicle(e.target.value)}} />                                                  
                                                    <label className="mx-1" htmlFor="car">Car</label>
                                                </div>
                                                <div>
                                                    <input id="bike" type="radio" value="Bike" name="vehicle" onChange={(e)=>{setVehicle(e.target.value)}} />
                                                    <label className="mx-1" htmlFor="bike">Bike</label>
                                                </div>                                
                                        </div>                              
                                    </div>  
                              <div className="flex justify-center my-2"> <WhiteButton buttonName={"Find Parking Lot near me"} onClickHandler={ ()=>{

                                    if(latitude == null || longitude== null){
                                        alert("Please give permission to fetch location")
                                    }
                                    if (!token || token === "null") {
                                        setOverlay(overLay.authenticationRequired)
                                        return;
                                    }


                                    clickHandler_Of_FindParkingLotNearMe_Button()

                                    }}/>
                                </div>   
                                
                        <div className="font-semibold p-2 text-xl"> Or </div>  

                                   
                                    <Input label="Enter Location" name="location" type="text" placeholder={""} onChangeHandler={(e) => { setLocation(e.target.value) }} value={location}/>         
                                    {isLocationEmpty && <div className="mx-10 py-0 text-sm text-red-500 flex justify-center">{"Location is required!"}</div>}
                                                                            
                                   
                                    {isVehicleEmpty && <div className="mx-10 py-0 text-sm text-red-500 flex justify-center">{"Vehicle Type is required!"}</div>}
                                    {error && <div className="mx-10 py-0 text-sm text-red-500 flex justify-center">{error}</div>}
                                    <GreenButton buttonName={"Search"} onClickHandler={()=>{
                                         if (!token || token === "null") {
                                            setOverlay(overLay.authenticationRequired)
                                            return;
                                        }
                                       
                                        handleClick()
                                    }} />   

                                                      
                            </div>  

                            
                        
                                                   
                           </div>
                       </div>
                </div>
       

            
            </>
            }

            {overlay === overLay.parkings && <>
              <div className="flex justify-center sm:pt-28 pt-14 pb-14 sm:pb-0 ">
              
              <div className=" w-full text-center lg:w-250">
                  {loading && <LoadinIcon/>}  

                  { parkings.length >1 ? <>   
                  {parkings.map((parking)=>( 
                       
                        <div key={parking.id} className="flex justify-center"
                          onClick ={()=> navigate(`/getparking/${parking.id}/${localStorage.getItem("vehicle")}`)}
                        ><ParkingTemplate parking={parking} vehicle ={localStorage.getItem("vehicle") || ""} /> </div>                    
                  ))}         
                  </>

                  :<>
                 
                  <div className="flex justify-center items-center h-screen ">
                  {searchButtonClicked?
                  <div className="font-semibold">No Parkings Found on the given location , Please Search again <a className="text-white">,</a> 
                  <GreenButton buttonName="click here" onClickHandler={()=>setOverlay(overLay.home)}/>
                  </div>
                  :<div className="font-semibold">Search the location to find Parking spots <a className="text-white">,</a> 
                  <GreenButton buttonName="click here" onClickHandler={()=>setOverlay(overLay.home)}/>
                  </div>}
                  </div>
                  
                  
                       
                  </>
                  }
              </div>    
          </div>   
             </>
            }

            {overlay === overLay.bookings && <>
              
               <div className="flex flex-col justify-center sm:pt-28 pt-16 pb-14 sm:pb-0">
                      
                    {bookings &&  bookings?.length<0 &&  <div className="flex  justify-center items-center h-screen ">
                      <div className="font-semibold">No Bookings to show, Book parking spot
                         <a className="text-white">,</a> 
                        <div className="flex justify-center"><GreenButton buttonName="click here" onClickHandler={()=>setOverlay(overLay.home)}/></div>
                        </div> 
                      </div>
                    }   
                       

                      { bookings &&<div>
         
                      {bookings.map((booking)=>(
                                 <BookingCard key={booking.id} booking={booking} />
                      ))}
                      </div>
                      }
                   
               </div>
                        
            </>}

            {overlay === overLay.support && <>                
            <div className="flex flex-col justify-center items-center h-screen ">
                <div className="bg-white shadow-md rounded-lg p-4 border border-gray-300 max-w-md w-11/12 mx-auto">
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

            {overlay === overLay.authenticationRequired &&
            <>
            <div className="absolute inset-0 bg-black/50  flex items-center justify-center text-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-fit">
            <h2 className="text-xl font-semibold">Please log in to access this feature</h2>
            <div className="justify-between flex">
            <GreenButton buttonName={"Close"} onClickHandler={()=> setOverlay(overLay.home)}  />
            <GreenButton buttonName={"Signin"} onClickHandler={()=> navigate("/signin")}  />
            </div>
            </div>
            </div>
            </>
            
            }
     
                       
       </>
}