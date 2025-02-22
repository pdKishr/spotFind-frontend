import Input        from "../COMPONENTS/Input";
import { useState } from "react";

export default ()=>{
    const [city , setCity]         = useState("");
    const [vehicle , setVehicle]   = useState("");
    const [location , setLocation] = useState("");
    
    return <>
        <div className="bg-white sm:h-100">
        <div className="flex justify-center">
                <div className="w-fit text-center text-2xl lg:text-4xl lg:w-250 my-5">
                    Book your parking spot
                    <div className="text-xl ">
                           <Input label="Search city"  name="" type="text" placeholder="Bengaluru" onChangeHandler={(e)=>{
                             setCity(e.target.value)
                           }}/>
                           <Input label="Vehicle type" name="" type="text" placeholder="Car or Bike" onChangeHandler={(e)=>{
                             setVehicle(e.target.value)
                           }}/>
                           <Input label="Enter Location" name="" type="text" placeholder="Nearest Loaction" onChangeHandler={(e)=>{
                             setLocation(e.target.value)
                           }}/>                            
                    </div>
                </div>
             </div>
        </div>
    </>

}