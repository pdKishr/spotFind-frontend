import Input        from "../COMPONENTS/SpecialInput";
import { useState } from "react";

export default ()=>{
    const [city , setCity]         = useState("");
    const [vehicle , setVehicle]   = useState("");
    const [location , setLocation] = useState("");
    
    return <>
        <div className="bg-gray-100 ">
           <div className="flex justify-center">
                <div className="w-full  text-center text-2xl lg:text-4xl lg:w-260 my-4">
                 <div className="font-semibold">Book your Parking Spot Now </div> 
                       <div className="text-sm">
                                 <div className="flex justify-center">
                                    <div className="w-1/2  justify-start">
                                    <Input label="Search city"  name="" type="text" placeholder="Bengaluru" onChangeHandler={(e)=>{
                                 setCity(e.target.value)
                                 }}/>
                                    </div>
                                
                                    <div className="w-1/2">
                                 <Input label="Enter Location" name="" type="text" placeholder="NearBy Location" onChangeHandler={(e)=>{
                                 setLocation(e.target.value)
                                 }}/>   
                                  </div>
                                 </div>      
                                 

                           
                           <div className="flex justify-center space-x-2">
                               <label className="font-bold">Select Vehicle</label>
                                 <div className="flex justify-bewteen ">
                                       <div className="mx-2 ">
                                          <input id="car" type="radio" value="Car"name="vehicle" className=""
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
        
    </>

}