import NavBar      from "../SUPER_COMPONENTS/NavBar"
import Button      from "../COMPONENTS/Button"
import Title       from "../COMPONENTS/Title"
import InputFields from "../SUPER_COMPONENTS/InputFields"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

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
        <div className="max-w-full h-30 bg-green-600 sm:h-15">
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
        <NavBar/>
        <InputFields/>

        <div className="bg-gray-100 h-15">                     
            <div className="flex justify-center">
                                <Button buttonName={"Search"} onClickHandler={()=>{
                                    navigate("/signup")
                                }}></Button>               
            </div>                         
        </div>

         <div className="flex justify-center h-screen ">
            <div className="bg-white w-full  text-center lg:w-250">
                advertise here..
            </div>    
        </div>       
        </>
    )
}