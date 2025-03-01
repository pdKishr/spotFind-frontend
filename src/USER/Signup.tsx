import { useEffect, useState }  from "react";
import Input         from "../COMPONENTS/Input";
import Button        from "../COMPONENTS/GreenButton";
import Heading       from "../COMPONENTS/Heading";
import SubHeading    from "../COMPONENTS/SubHeading";
import {useNavigate} from "react-router-dom";
import UserSignup    from "../API_SERVICE/signinup";
import Title from "../COMPONENTS/Title";
import Backicon from "../ASSETS/Backicon";
import AlertCard from "../COMPONENTS/AlertCard";
import LoadinIcon from "../ASSETS/LoadinIcon";

export default ()=>{
    const navigate = useNavigate();

    const [fname,setFname]               = useState("");
    const [mobileNumber,setMobileNumber] = useState("");
    const [email,setEmail]               = useState("");
    const [password ,setPassword]        = useState("");
 
       const [error,setError] = useState("");
       const [fnameEmpty,setFnameEmpty] = useState(false);
       const [mobileNumberEmpty,setMobileNumberEmpty] = useState(false);
       const [emailEmpty,setEmailEmpty] = useState(false);
       const [passwordEmpty,setPasswordEmpty] = useState(false);
       const [loading,setLoading] = useState(false);
     
       const handleSignup= async()=>{
           setLoading(true);
           setError("");
           setFnameEmpty(false);
           setMobileNumberEmpty(false);
           setEmailEmpty(false);
           setPasswordEmpty(false);
       
           try{
               const trimmedMobile = mobileNumber.trim();
               const trimmedPassword = password.trim();
               const trimmedEmail = email.trim();
               const trimmedFname = fname.trim();
   
               if (trimmedMobile === "" || trimmedPassword === "" || trimmedEmail==="" || trimmedFname==="") {
                   if (trimmedMobile === "") setMobileNumberEmpty(true);
                   if (trimmedPassword === "") setPasswordEmpty(true);
                   if (trimmedEmail === "") setEmailEmpty(true);
                   if (trimmedFname === "") setFnameEmpty(true);
                   return;
               }
   
                       const data = await UserSignup({fname:trimmedFname ,mobileNumber:trimmedMobile,email:trimmedEmail,password:trimmedPassword });  
                       if(data.error) {
                           if(data.error.mobileNumber || data.error.email)  setError("Please enter a valid mobile number or Email !")   
                           else setError(data.error)          
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

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            navigate("/")
        }
    },[navigate])
    
    return<>
     <div className="fixed  top-0  w-full max-w-full h-auto bg-green-500 ">
                    <div className="flex justify-center mr-1">
                        <div  className="w-full text-center lg:w-250">
                          <div className="flex justify-between items-center">
                              <Title/>   
                             <button onClick={()=> navigate("/")} className="text-white font-bold"> <Backicon /></button>
                          </div>                       
                        </div>
                     </div>
        </div>        
    <div className=" flex  flex-col items-center justify-center h-screen bg-gray-100 pt-5">       
    <div className="bg-white rounded-md shadow-md w-11/12 sm:w-96 pb-3">  
        <Heading heading={loading?"Creating Account...":"Register"}/>  
     {
        loading ?<LoadinIcon/> : 
        <div>
                <SubHeading subheading="Enter your details here"/>
                <div>
                    <Input label="Full Name" type="text" placeholder="Puruth D Kishore" onChangeHandler={(e) => { setFname(e.target.value); } } name={""} value={undefined}></Input>
                    {fnameEmpty && <AlertCard message={"Name is required !"} />}
                    <Input label="Mobile Number" type="text" placeholder="9876543210" onChangeHandler={(e) => { setMobileNumber(e.target.value); } } name={""} value={undefined}></Input>
                    {mobileNumberEmpty && <AlertCard message={"Mobile number is required !"} />}
                    <Input label="Email" type="text" placeholder="pdk@gmail.com" onChangeHandler={(e) => { setEmail(e.target.value); } } name={""} value={undefined}></Input>
                    {emailEmpty && <AlertCard message={"Email is required !"}/>}
                    <Input label="Password" type="text" placeholder="password" onChangeHandler={(e) => { setPassword(e.target.value); } } name={""} value={undefined}></Input>           
                    {passwordEmpty && <AlertCard message="Password is required !"/>}
                </div>

                {error &&   
                    <div className="p-5 flex justify-center text-sm text-red-500">
                        {error}
                    </div>
                }
                
                
                <div className="justify-items-center">
                    <Button buttonName="SignUp" onClickHandler={handleSignup}></Button>
                    <div>        
                        Already have an account ?,<button onClick={()=>{
                            navigate("/signin")
                        
                        }}><div className="text-blue-600 underline">Sign in</div>
                        </button>
                    </div>
                </div>  
        </div>} 
    </div>       
    </div>
    </>
}