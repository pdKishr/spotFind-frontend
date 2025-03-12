import {useEffect, useState} from 'react'

interface GeolocationData {
    latitude: number | null;
    longitude: number | null;
    accuracy: number | null;
  };

export default ()=>{
     const [location,setLocation] = useState<GeolocationData>({
        latitude : null,
        longitude : null,
        accuracy : null
     })

     useEffect(()=>{
        if(!navigator.geolocation) {
            console.error("geolocation is not supported by your browser")
            return;
        }

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                setLocation({
                    latitude : position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy : position.coords.accuracy
                });
            }
           ,
            (error)=>{
                console.error("Error in fetching location :" + error.message);
            }
            ,
            {
                enableHighAccuracy : true,
                maximumAge: 0,
                timeout : 5000
            }
        );

        return ()=> navigator.geolocation.clearWatch(watchId);
     },[]);

     return location;
}