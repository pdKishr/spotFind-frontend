import { useEffect, useState }  from "react";
import Input         from "../COMPONENTS/Input";
import Button        from "../COMPONENTS/GreenButton";
import Heading       from "../COMPONENTS/Heading";
import SubHeading    from "../COMPONENTS/SubHeading";
import {useNavigate} from "react-router-dom";
import UserSignin    from "../API_SERVICE/signin";
import Title from "../COMPONENTS/Title";
import Backicon from "../ASSETS/Backicon";
import LoadinIcon from "../ASSETS/LoadinIcon";

export default ()=>{
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            navigate("/")
        }
    },[navigate])
   
    const [mobileNumber,setMobileNumber] = useState("");
    const [password ,setPassword]        = useState("");

    const [error,setError] = useState("");
    const [mobileNumberEmpty,setMobileNumberEmpty] = useState(false);
    const [passwordEmpty,setPasswordEmpty] = useState(false);
    const [loading,setLoading] = useState(false);

   
    const handleSignin = async()=>{
        setLoading(true);
        setError("");
        setMobileNumberEmpty(false);
        setPasswordEmpty(false);
    
        try{
            const trimmedMobile = mobileNumber.trim();
            const trimmedPassword = password.trim();

            if (trimmedMobile === "" || trimmedPassword === "") {
                if (trimmedMobile === "") setMobileNumberEmpty(true);
                if (trimmedPassword === "") setPasswordEmpty(true);
                return;
            }

                    const data = await UserSignin({mobileNumber:trimmedMobile,password:trimmedPassword});  
                    if(data.error) {
                        
                        setError(data.error)                   
                        return;
                    }
                    
                    localStorage.setItem("token",data.token);
                    localStorage.setItem("id",data.id);
                    navigate("/")     
        
         } catch(err){
            setError("Something went wrong. Please try again!");
           }  finally {
             setLoading(false);
              }     
        
    }
        
    return<>
    <div className="fixed top-0 w-full max-w-full h-18 bg-green-500 ">
                <div className="flex justify-center mr-1">
                    <div  className="w-full text-center lg:w-250">
                      <div className="flex justify-between items-center">
                          <Title/>  
                           <button onClick={()=> navigate("/")} className="text-white font-bold"> <Backicon /></button>
                      </div>                       
                    </div>
                 </div>
            </div> 
  
          
    <div className="flex  flex-col items-center justify-center h-screen ">   
    <div className="bg-white rounded-md shadow-md w-11/12 h-auto sm:w-96 pb-3">
   
   
        <Heading heading={loading?"Signing in":"Sign In"}/>  

    {
    loading ?<LoadinIcon/> : 
    <>
        <SubHeading subheading="Enter credentials here"/>
        <div>           
            <Input label="Mobile Number" type="text" placeholder={"9876543210"} onChangeHandler={(e) => { setMobileNumber(e.target.value); } } name={mobileNumber} value={mobileNumber}></Input>
            {mobileNumberEmpty && <div className="mx-2 px-3 py-0 text-xs text-red-500 flex justify-between">{"Mobile number is required!"}</div>}
            <Input label="Password" type="password" placeholder="password" onChangeHandler={(e) => { setPassword(e.target.value); } } name={password} value={password}></Input>           
            {passwordEmpty && <div className="mx-2 px-3 py-0 text-xs text-red-500 flex justify-between"> {"Password is required!"} </div>}
        </div>

        {error &&   
            <div className="p-5 flex justify-center text-sm text-red-500">
                {error}
            </div>
        }
            
        <div className="justify-items-center">
        <Button buttonName="SignIn" onClickHandler={handleSignin}></Button>
        <div>        
            Don't have an account ?,<button onClick={()=>{
                navigate("/signup")
            }}>
            <div className="text-blue-600 underline">Sign up</div>
            </button>
        </div>
        </div> 
        </>   
     
       }  
    </div>
    </div>
    </>
}
