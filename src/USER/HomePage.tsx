import ProfileIcon   from "../ASSETS/ProfileIcon"
import Button        from "../COMPONENTS/WhiteButton"
import NavBar        from "../SUPER_COMPONENTS/NavBar"
import NavIcon       from "../COMPONENTS/NavIcon"
import Title         from "../COMPONENTS/Title"
import InputFields   from "../SUPER_COMPONENTS/InputFields"
import {useNavigate} from "react-router-dom"
import { useEffect } from "react"
import GreenButton   from "../COMPONENTS/GreenButton"

export default ()=>{

    const navigate = useNavigate();  

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/signin")
        }
    },[])

       return <>
        <div className="max-w-full h-15 bg-green-600">
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
        <NavBar/>    
        <InputFields/>
        
                <div className="bg-gray-100 h-18">                     
                    <div className="flex justify-center">                               
                        <GreenButton buttonName={"Search"} onClickHandler={()=>navigate("/signup")} />           
                    </div>                         
                </div>
        
                 <div className="flex justify-center h-screen ">
                    <div className="bg-white w-full  text-center lg:w-250">
                        advertise here..
                    </div>    
                </div>              
        
        
               
       </>
}