import ProfileIcon   from "../ASSETS/ProfileIcon"
import Button        from "../COMPONENTS/Button"
import NavBar        from "../SUPER_COMPONENTS/NavBar"
import NavIcon       from "../COMPONENTS/NavIcon"
import Title         from "../COMPONENTS/Title"
import InputFields   from "../SUPER_COMPONENTS/InputFields"
import {useNavigate} from "react-router-dom"
import { useCallback, useEffect, useState } from "react"


export default ()=>{

    const navigate = useNavigate();  

      const [overLay,setOverLay] = useState(false);
      const openOverlay  = useCallback(() => setOverLay(true), []);
      const closeOverlay = useCallback(() => setOverLay(false), []);

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

        <div className="flex items-center justify-center">  
            <div>
                <InputFields/> 
                <div className="bg-white h-15">                     
                    <div className="flex justify-center">
                            <Button buttonName={"Search"} onClickHandler={()=>{}}></Button>               
                    </div>                         
                </div>
               </div>
        </div>               
        
        
               
       </>
}