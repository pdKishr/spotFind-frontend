import { useEffect, useState }  from "react";
import Input         from "../COMPONENTS/Input";
import Button        from "../COMPONENTS/Button";
import Heading       from "../COMPONENTS/Heading";
import SubHeading    from "../COMPONENTS/SubHeading";
import {useNavigate} from "react-router-dom";
import UserSignup    from "../API_SERVICE/signinup";

export default ()=>{
    const navigate = useNavigate();

    const [fname,setFname]               = useState("");
    const [mobileNumber,setMobileNumber] = useState("");
    const [email,setEmail]               = useState("");
    const [password ,setPassword]        = useState("");
 
    const handleSignup = async ()=>{ 
        if(fname=="" || mobileNumber=="" || email=="" || password=="") alert("fields should not be empty")  
            else{
                const data = await UserSignup({fname,email,mobileNumber,password});  
                navigate('/signin');            
                alert("action") 
        }                      
    }

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            navigate("/homepage")
        }
    },[])
    
    return<>
    <div className="flex  flex-col items-center justify-center h-screen bg-gray-100">       
    <div className="bg-white rounded-md shadow-md w-11/12 h-auto sm:w-96 pb-3">  
        <Heading heading="Sign up"/>  
        <SubHeading subheading="Enter your details here"/>
        <div>
            <Input label="FullName"      type="text"  placeholder="Puruth D Kishore"    onChangeHandler={(e)=>{setFname(e.target.value)}}></Input>
            <Input label="MobileNumber"  type="text"  placeholder="9876543210"          onChangeHandler={(e)=>{setMobileNumber(e.target.value)}}></Input>
            <Input label="Email"         type="text"  placeholder="puruthdk@gmail.com"  onChangeHandler={(e)=>{setEmail(e.target.value)}}></Input>
            <Input label="Password"      type="text"  placeholder="password@123"        onChangeHandler={(e)=>{setPassword(e.target.value)}}></Input>           
        </div>
        <div className="justify-items-center">
        <Button buttonName="SignUp" onClickHandler={handleSignup}></Button>
        <div>        
            Already have an account ?,<button onClick={()=>{
                navigate("/signin")
               
            }}><div className="text-blue-600 underline">Sign in</div>
            </button>
        </div>
        </div>   
    </div>       
    </div>
    </>
}