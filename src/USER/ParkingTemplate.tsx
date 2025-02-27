
import { Parking } from "../ZUSTAND_STORE/store"

interface props {
   parking : Parking
   vehicle : string
}

export default ({parking , vehicle }: props)=>{


  return<>

    <div className="bg-white shadow rounded p-3 m-5 w-100">

      <div className="flex justify-between">
           
            <div className="pr-5 pb-5">    
                  <p className="font-semibold">{parking.parkingName}</p>
                  <p className="text-sm">{parking.city} , {parking.state}</p> 
                  <p className="text-sm">{ !parking.isAvailableFor24Hours && <> Available from {parking.openTime} to {parking.closeTime} </>}</p>      
            </div>           
            
            <div className="top-0 right-0">
                  <div className=" text-white p-1 text-xs rounded" style={{ backgroundColor: "#1877F2" }}>{parking.isAvailableFor24Hours && <>24/7</>}</div>
            </div>          
       </div>

       <div className="flex justify-end"> 
           
            <div className="justify-end w-fit p-1"  >                    
            
                        <div className="text-sm">
                             Rs.{parking.isBikeParkingAvailable ? <>{parking.bikeCharge}</>:<>{parking.carCharge}</>}
                        </div>  
                        <p className="text-xs text-gray-600">{ vehicle=="car"?<>{parking.availableCarSpots}</>:<>{parking.availableBikeSpots}</>} spots left</p>

                                     
            </div> 
                     
       </div>
      
    </div>
    </>
}