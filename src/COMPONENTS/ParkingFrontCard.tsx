

interface Props{
    parkingName : string,
    location : string,
    city : string,
    k: number
}


export default ({parkingName,location,city,k}:Props)=>{
   
    return<>
        <div className="flex-col justify-center shadow  p-5 mb-2 rounded-xl">
            <div className="font-bold">
                {k+1+" "}
                {" "+parkingName}
            </div>
            <div className="">
                <div>
                  {location}
                </div>
                  {city}
            </div>
        </div>
    </>
}