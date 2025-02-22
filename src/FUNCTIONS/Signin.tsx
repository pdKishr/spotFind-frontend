import { useEffect, useState }  from "react";
import Input         from "../COMPONENTS/Input";
import Button        from "../COMPONENTS/Button";
import Heading       from "../COMPONENTS/Heading";
import SubHeading    from "../COMPONENTS/SubHeading";
import {useNavigate} from "react-router-dom";
import UserSignin    from "../API_SERVICE/signin";

export default ()=>{

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            navigate("/homepage")
        }
    },[])
   
    const [mobileNumber,setMobileNumber] = useState("");
    const [password ,setPassword]        = useState("");

    const navigate = useNavigate();

    const handleSignin = async()=>{
        if(mobileNumber=="" || password=="") alert("fields should not be empty");
        else{
                const data = await UserSignin({mobileNumber,password});          
                localStorage.setItem("token",data.token);
                localStorage.setItem("id",data.id);
                 navigate("/homepage")     
        }
    }
        
    return<>
    <div className="flex  flex-col items-center justify-center h-screen bg-gray-100">       
    <div className="bg-white rounded-md shadow-md w-11/12 h-auto sm:w-96 pb-3">  
        <Heading heading="Sign in"/>  
        <SubHeading subheading="Enter credentials here"/>
        <div>           
            <Input label="MobileNumber"  type="text"  placeholder="9876543210"    onChangeHandler={(e)=>{setMobileNumber(e.target.value)}}></Input>
            <Input label="Password"      type="text"  placeholder="password@123"  onChangeHandler={(e)=>{setPassword(e.target.value)}}></Input>           
        </div>
            
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
     
    </div>       
    </div>
    </>
}
