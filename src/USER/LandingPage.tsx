
import Button      from "../COMPONENTS/WhiteButton"
import Title       from "../COMPONENTS/Title"
import InputFields from  "../SUPER_COMPONENTS/InputFields"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import GreenButton from "../COMPONENTS/GreenButton"


export default ()=>{
    
    const navigate = useNavigate();

     useEffect(()=>{
                   const token = localStorage.getItem("token");
                   if(token){
                       navigate("/homepage")
                   }
               },[])
    
    return (
        <>
       <div className="max-w-full  bg-green-500 p-2">
            <div className="flex justify-center ">
                <div className="w-full text-center lg:w-250">
                    <div className="hidden sm:flex justify-between items-center">
                         <Title/>                                                                    
                                <div className="sm:flex">
                                <Button buttonName={"ListYourSpot"} onClickHandler={()=>{navigate("/signup")}}/>
                                <Button buttonName={"SignUp"} onClickHandler={()=>{navigate("/signup")}}/>
                                <Button buttonName={"SignIn"} onClickHandler={()=>{navigate("/signin")}}/>
                                </div>                                                 
                    </div> 
                    <div className="sm:hidden">
                         <Title/> 
                                <div className="flex justify-center">
                                <Button buttonName={"ListYourSpot"} onClickHandler={()=>{}}/>
                                <Button buttonName={"SignUp"} onClickHandler={()=>{navigate("/signup")}}/>
                                <Button buttonName={"SignIn"} onClickHandler={()=>{navigate("/signin")}}/>
                                </div>                     
                    </div>
                </div>
             </div>
        </div>     
        <InputFields/>

        <div className="bg-gray-100 h-18">                     
            <div className="flex justify-center">                               
                <GreenButton buttonName={"Search"} onClickHandler={()=>navigate("/signup")} />           
            </div>                         
        </div>
         <div className="flex justify-center h-screen ">
            <div className="bg-white w-full  text-center lg:w-250">
                
            </div>    
        </div>       
        </>
    )
}