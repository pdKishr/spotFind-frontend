import { useNavigate, useParams } from "react-router-dom";
import Backicon from "../ASSETS/Backicon";
import NavIcon from "../COMPONENTS/NavIcon";
import Title from "../COMPONENTS/Title";
import { Parking} from "../ZUSTAND_STORE/store";
import ParkingInfoIcon from "../ASSETS/ParkingInfoIcon";
import BookingsIcon from "../ASSETS/BookingsIcon";
import TicketIcon from "../ASSETS/TicketIcon";
import CheckoutIcon from "../ASSETS/CheckoutIcon";
import { useEffect, useState } from "react";

import WhiteButton from "../COMPONENTS/WhiteButton";
import GreenButton from "../COMPONENTS/GreenButton";
import getParkingById from "../API_SERVICE/getParkingById";
import UpdateParkingAPI from "../API_SERVICE/UpdateParkingAPI";

enum overlayConstant {
    info,
    bookings,
    ticket,
    checkout
}

export default () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const parkingId: number = Number(id);

    const [parking, setParking] = useState<Parking>({
        id: 0,
        parkingName: "",
        email: "",
        mobileNumber: "",
        location: "",
        address: "",
        city: "",
        state: "",
        isBikeParkingAvailable: false,
        noOfBikeSpots: 0,
        bikeCharge: 0,
        isCarParkingAvailable: false,
        noOfCarSpots: 0,
        carCharge: 0,
        isAvailableFor24Hours: false,
        openTime: "",
        closeTime: "",
        availableBikeSpots: 0,
        availableCarSpots: 0,
        latitude : 0,
        longitude : 0,
        pincode : ""
    });

    const [timeAvailability, setTimeAvailability] = useState(false);
    const [carAvailability, setCarAvailability] = useState(false);
    const [BikeAvailability, setBikeAvailability] = useState(false);

    useEffect(() => {
        async function fetchParking() {
            try {
                const data: Parking = await getParkingById(parkingId);
                setParking(data);
            } catch (error) {
                console.error("Error fetching parking details:", error);
            }
        }
        fetchParking();
    }, [parkingId]);

    const [overLay, setOverLay] = useState<overlayConstant>(overlayConstant.info);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setParking(prev => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value,
        }));
    };

    const handleRadioChange = (field: keyof Parking, value: boolean) => {
        setParking(prev => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        if (parking.isAvailableFor24Hours) {
            setParking((prev) => ({ ...prev, openTime: "12.00AM", closeTime: "11.59PM" }));
        }
    }, [parking.isAvailableFor24Hours]);

    useEffect(() => {
        if (!parking.isBikeParkingAvailable) {
            setParking((prev) => ({ ...prev, bikeCharge: 0, noOfBikeSpots: 0 }));
        }
    }, [parking.isBikeParkingAvailable]);

    useEffect(() => {
        if (!parking.isCarParkingAvailable) {
            setParking((prev) => ({ ...prev, carCharge: 0, noOfCarSpots: 0 }));
        }
    }, [parking.isCarParkingAvailable]);

    console.log(parking.latitude + " "+parking.longitude)

    return <>
        <div className="fixed top-0 left-0 w-full">
            <div className="max-w-full h-18 sm:h-15 bg-green-500">
                <div className="flex justify-center">
                    <div className="w-full text-center lg:w-250">
                        <div className="flex justify-between items-center">
                            <Title />
                            <div className="flex px-2 items-center">
                                <div className="text font-semibold text-white">{parking ? parking.parkingName : "ParkingName"}</div>
                                <button onClick={() => { navigate("/listYourParking") }}>
                                    <NavIcon label="" icon={<Backicon />} textColor="white" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-green-500 h-15">
                <div className="flex justify-evenly sm:justify-center">
                    <button onClick={() => { setOverLay(overlayConstant.info) }} className={overLay === overlayConstant.info ? "bg-white rounded" : ""}>
                        <NavIcon textColor={overLay === overlayConstant.info ? "green" : "white"} icon={<ParkingInfoIcon />} label={"Info"} />
                    </button>
                    <button onClick={() => { setOverLay(overlayConstant.bookings) }} className={overLay === overlayConstant.bookings ? "bg-white rounded" : ""}>
                        <NavIcon textColor={overLay === overlayConstant.bookings ? "green" : "white"} icon={<BookingsIcon />} label={"Bookings"} />
                    </button>
                    <button onClick={() => { setOverLay(overlayConstant.ticket) }} className={overLay === overlayConstant.ticket ? "bg-white rounded" : ""}>
                        <NavIcon textColor={overLay === overlayConstant.ticket ? "green" : "white"} icon={<TicketIcon />} label={"Generate Ticket"} />
                    </button>
                    <button onClick={() => { setOverLay(overlayConstant.checkout) }} className={overLay === overlayConstant.checkout ? "bg-white rounded " : ""}>
                        <NavIcon textColor={overLay === overlayConstant.checkout ? "green" : "white"} icon={<CheckoutIcon />} label={"Checkout"} />
                    </button>
                </div>
            </div>
        </div>

        <div className="flex justify-center items-center p-5 ">
            {(overLay === overlayConstant.info) && <>

                <div className=" overflow-y-auto  scrollbar-hide my-25">

                    <div className="flex justify-center p-5">
                        <WhiteButton buttonName={"Update"} onClickHandler={async () => {
                           await UpdateParkingAPI(parking);
                            alert("updated successfully")
                        }} />
                    </div>

                    <div className="">
                        <div>
                            <ParkingTemplate title="Parking Name" label={parking?.parkingName} type={"text"} name="parkingName" onChangeHandler={handleChange} />
                            <ParkingTemplate title="Email" label={parking?.email} type={"text"} name="email" onChangeHandler={handleChange} />
                            <ParkingTemplate title="Mobile Number" label={parking?.mobileNumber} type={"text"} name="mobileNumber" onChangeHandler={handleChange} />
                            <ParkingTemplate title="Location" label={parking?.location} type={"text"} name="location" onChangeHandler={handleChange} />
                            <ParkingTemplate title="Address" label={parking?.address} type={"text"} name="address" onChangeHandler={handleChange} />
                            <ParkingTemplate title="City" label={parking?.city} type={"text"} name="city" onChangeHandler={handleChange} />
                            <ParkingTemplate title="State" label={parking?.state} type={"text"} name="state" onChangeHandler={handleChange} />

                            <div onClick={() => setBikeAvailability(true)}>
                                <div className="p-2">
                                    <div className="">
                                        <div className="text-black ">
                                            Bike Parking Available?
                                        </div>
                                        <div className="text-gray-500 p-1">
                                            {parking?.isBikeParkingAvailable ? "Yes" : "No"}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {BikeAvailability && (
                                <div className="flex">
                                    <label className="font-bold"></label>
                                    <div className="flex justify-between">

                                        <input type="radio" name="isBikeParkingAvailable" onChange={() => handleRadioChange("isBikeParkingAvailable", true)} />
                                        <label className="mx-1">Yes</label>

                                        <input type="radio" name="isBikeParkingAvailable" onChange={() => handleRadioChange("isBikeParkingAvailable", false)} />
                                        <label className="mx-1">No</label>

                                    </div>
                                </div>
                            )}

                            {parking?.isBikeParkingAvailable && (
                                <>
                                    <ParkingTemplate title="Number of Bike Spots" label={parking?.noOfBikeSpots} type={"text"} name="noOfBikeSpots" onChangeHandler={handleChange} />
                                    <ParkingTemplate title="Bike Charge" label={parking?.bikeCharge} type={"number"} name="bikeCharge" onChangeHandler={handleChange} />
                                </>
                            )}

                            <div onClick={() => setCarAvailability(true)}>
                                <div className="p-2">
                                    <div className="">
                                        <div className="text-black ">
                                            Car Parking Available?
                                        </div>
                                        <div className="text-gray-500 p-1">
                                            {parking?.isCarParkingAvailable ? "Yes" : "No"}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {carAvailability && (
                                <div className="flex">
                                    <label className="font-bold"></label>
                                    <div className="flex justify-between">
                                        <input type="radio" name="isCarParkingAvailable" onChange={() => handleRadioChange("isCarParkingAvailable", true)} />
                                        <label className="mx-1">Yes</label>
                                        <input type="radio" name="isCarParkingAvailable" onChange={() => handleRadioChange("isCarParkingAvailable", false)} />
                                        <label className="mx-1">No</label>
                                    </div>
                                </div>
                            )}

                            {parking?.isCarParkingAvailable && (
                                <>
                                    <ParkingTemplate title="Number of Car Spots" label={parking?.noOfCarSpots} type={"number"} name="noOfCarSpots" onChangeHandler={handleChange} />
                                    <ParkingTemplate title="Car Charge" label={parking?.carCharge} type={"number"} name="carCharge" onChangeHandler={handleChange} />
                                </>
                            )}

                            <div onClick={() => setTimeAvailability(true)} className="">
                                <div className="p-2">
                                    <div className="">
                                        <div className="text-black ">
                                            Available 24/7?
                                        </div>
                                        <div className="text-gray-500 p-1">
                                            {parking?.isAvailableFor24Hours ? "Yes" : "No"}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {timeAvailability && (
                                <div>
                                    <div className="flex">
                                        <label className="font-bold"></label>
                                        <div className="flex justify-between">
                                            <div className="mx-2">
                                                <input type="radio" name="isAvailableFor24Hours" onChange={() => handleRadioChange("isAvailableFor24Hours", true)} />
                                                <label className="mx-1">Yes</label>
                                            </div>
                                            <div className="mx-2">
                                                <input type="radio" name="isAvailableFor24Hours" onChange={() => handleRadioChange("isAvailableFor24Hours", false)} />
                                                <label className="mx-1">No</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!parking?.isAvailableFor24Hours && (
                                <>
                                    <ParkingTemplate title="Opening Time" label={parking?.openTime} type={"text"} name="openTime" onChangeHandler={handleChange} />
                                    <ParkingTemplate title="Closing Time" label={parking?.closeTime} type={"text"} name="closeTime" onChangeHandler={handleChange} />
                                </>
                            )}
                            <ParkingTemplate title="Latitude" label={parking?.latitude}   type={"text"} name="latitude" onChangeHandler={handleChange} />
                            <ParkingTemplate title="Longitude" label={parking?.longitude} type={"text"} name="longitude" onChangeHandler={handleChange} />
                        </div>

                    </div>

                </div>

            </>}

            {(overLay === overlayConstant.bookings) && (
                <div className="flex justify-center items-center h-screen ">
                    <div className="">
                        <div>
                            <GreenButton buttonName="Show Offline bookings" onClickHandler={() => { navigate(`/getBookings/${parkingId}/offline`) }} />
                        </div>
                        <div>
                            <GreenButton buttonName="Show Online bookings" onClickHandler={() => { navigate(`/getBookings/${parkingId}/online`) }} />
                        </div>
                    </div>

                </div>
            )}

            {(overLay === overlayConstant.ticket) && (
                <div className="flex justify-center items-center h-screen ">
                    <div className="">
                        <div>
                            <GreenButton buttonName="Generate Bike Ticket" onClickHandler={() => { navigate(`/bookOfflineTicket/${parkingId}/bike`) }} />
                            <div className="border rounded-sm my-1 border-white shadow ">{"Available bike spots : " + parking?.availableBikeSpots} </div>
                        </div>
                        <div>
                            <GreenButton buttonName="Generate Car  Ticket" onClickHandler={() => { navigate(`/bookOfflineTicket/${parkingId}/car`) }} />
                            <div className="border border-white shadow rounded-sm my-1">{"Available car spots : " + parking?.availableCarSpots} </div>
                        </div>
                    </div>
                </div>)}

            {(overLay === overlayConstant.checkout) && (
                <div className="flex justify-center items-center h-screen ">
                    <div className="">
                        <div>
                            <GreenButton buttonName="CheckOut offline Ticket" onClickHandler={() => { navigate(`/CheckOutTicket/${parkingId}/offline`) }} />
                        </div>
                        <div>
                            <GreenButton buttonName="CheckOut online Ticket" onClickHandler={() => { navigate(`/CheckOutTicket/${parkingId}/online`) }} />
                        </div>
                    </div>
                </div>)}

        </div>


    </>
}

interface props {
    label: string | number | undefined | boolean
    title: string
    type: string
    name: string
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ParkingTemplate = ({ label, title, type, name, onChangeHandler }: props) => {
    return <>

        <div className="p-2">
            <div className="">
                <div className="text-black ">
                    {title}
                </div>

                <input className="p-1 border-none" placeholder={String(label)} type={type} name={name} onChange={onChangeHandler} />
            </div>
        </div>

    </>
}