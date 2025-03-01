import { SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import {  useUserStore } from "../ZUSTAND_STORE/store"
import { useNavigate } from "react-router-dom";
import Title from "../COMPONENTS/Title";
import Button from "../COMPONENTS/WhiteButton";
import NavIcon from "../COMPONENTS/NavIcon";
import ProfileIcon from "../ASSETS/ProfileIcon";
import Template from "../COMPONENTS/Template";
import EmailIcon from "../ASSETS/EmailIcon";
import PhoneIcon from "../ASSETS/PhoneIcon";
import Backicon from "../ASSETS/Backicon";
import Input from "../COMPONENTS/Input";
import UserUpdateProfile from "../API_SERVICE/updateProfile";
import GreenButton from "../COMPONENTS/GreenButton";
import WhiteButton from "../COMPONENTS/WhiteButton";


const UserProfile = () => {

  const id = Number(localStorage.getItem("id")) 
  const { user, fetchUser } = useUserStore();

  const [overLay,setOverLay] = useState(false);
  const openOverlay  = useCallback(() => setOverLay(true), []);
  const closeOverlay = useCallback(() => setOverLay(false), []);

  const [name,setName]                 = useState("");
  const [mobileNumber,setMobileNumber] = useState("");
  const [email,setEmail]               = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/landingpage");
  }, [navigate]);

   useEffect(() => {
        if (!user) {
            fetchUser();
        }
        if(user){
        
            setName((prev) => (prev !== user.name ? user.name : prev));
            setEmail((prev) => (prev !== user.email ? user.email : prev));
            setMobileNumber((prev) => (prev !== user.mobileNumber ? user.mobileNumber : prev));
        }
      
    }, [user]); 

    const onClickHandlerOfEditProfile = useCallback( () => {
        if (user?.name !== name || user?.email !== email || user?.mobileNumber !== mobileNumber) {
            UserUpdateProfile({ id, name, email, mobileNumber });
            alert("saved")
        }
        
    }, [id, name, email, mobileNumber, user]);

   const handleNameChange = useCallback((e: { target: { value: SetStateAction<string>; }; }) => setName(e.target.value), []);
   const handleEmailChange = useCallback((e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value), []);
   const handleMobileChange = useCallback((e: { target: { value: SetStateAction<string>; }; }) => setMobileNumber(e.target.value), []);

   const userDetails = useMemo(() => (
    <>
        <Template heading={"Name"} subHeading={user?.name} icon={<ProfileIcon />} />
        <Template heading={"Email"} subHeading={user?.email} icon={<EmailIcon />} />
        <Template heading={"Mobile"} subHeading={user?.mobileNumber} icon={<PhoneIcon />} />
    </>
    ), [user]);

    return (
        <div>
         
          <div className="fixed top-0 left-0 w-full h-15 bg-green-500">
            <div className="flex justify-center">
              <div className="w-full text-center lg:w-250">
                <div className="flex justify-between items-center">
                  <Title />
                  <div className="flex px-2 items-center">
                  <div className="text-xl text-white font-semibold mx-1">Profile</div>
                    <button onClick={() => navigate("/")}>
                      <NavIcon label="" textColor={"white"} icon={<Backicon />}  />
                    </button>
                 
                  </div>
                </div>
              </div>
            </div>
          </div>
              
          <div className=" h-screen flex justify-center items-center">
            <div className="w-fit p-6 rounded">
              <div className="flex justify-center items-center p-2">
                <div className="flex-col">{userDetails}</div>
              </div>
              <div className="flex justify-center p-5">
                <Button buttonName="Edit Profile" onClickHandler={openOverlay} />
              </div>
              <div className="flex justify-center ">
                <Button buttonName="Log out" onClickHandler={()=>{
                         localStorage.clear();
                         navigate("/")
                }} />
              </div>
            </div>
          </div>
      
        
          {overLay && (
            <>
            <div className="max-w-full h-18 bg-green-500 ">
                            <div className="flex justify-center ">
                                <div  className="w-full text-center lg:w-250">
                                  <div className="flex justify-between items-center">
                                      <Title/>  
                                      <WhiteButton buttonName={"Back"} onClickHandler={()=>navigate("/landingpage")} />
                                  </div>                       
                                </div>
                             </div>
                        </div> 

              <div className="fixed inset-0 bg-slate-100 flex items-center justify-center" onClick={closeOverlay}>
              <div className="bg-white p-6 rounded shadow-lg w-fit" onClick={(e) => e.stopPropagation()}>
                <Input label="Enter new Name" name="name" type="text" placeholder={user?.name || "Loading.."} onChangeHandler={handleNameChange} value={name} />
                <Input label="Enter new Email" name="email" type="text" placeholder={email} onChangeHandler={handleEmailChange} value={email} />
                <Input label="Enter new Mobile Number" name="mobilNumber" type="text" placeholder={mobileNumber} onChangeHandler={handleMobileChange} value={mobileNumber} />
                <div className="flex justify-evenly">
                <GreenButton buttonName="save" onClickHandler={onClickHandlerOfEditProfile}></GreenButton>
                <GreenButton buttonName="cancel" onClickHandler={closeOverlay}></GreenButton>

                </div>
           
              </div>
            </div>
            </>
            
           
          )}
        </div>
      );

}      

export default UserProfile; 

