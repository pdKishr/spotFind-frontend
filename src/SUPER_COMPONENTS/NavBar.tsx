import NavIcon from "../COMPONENTS/NavIcon"
import HomeIcon from "../ASSETS/HomeIcon"
import TicketIcon from "../ASSETS/TicketIcon"
import SupportIcon from "../ASSETS/SupportIcon"

export default ()=>{

     return<>
     <div className="h-15 bg-green-600 w-full flex justify-center" >
         <div className="w-full text-center lg:w-250">
               <div className="flex p-1 mx-5 justify-center">
                              <div className="flex mx-2">
                                 <button><NavIcon textColor="white" label={"Home"} icon={<HomeIcon/>}/></button>
                              </div>
                              <div className="flex mx-2">
                              <button><NavIcon textColor="white" label={"bookings"} icon={<TicketIcon/>}/></button>
                              </div>
                              <div className="flex mx-2">
                              <button><NavIcon textColor="white" label={"Support"} icon={<SupportIcon/>}/></button>
                              </div>
               </div>    
            </div>    
        </div>              
    </>
     
}