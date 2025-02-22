interface Props{
    parkingName : string,
    location : string,
    city : string,
    k: number
    parking_id : number
}

export default ({parkingName,location,city,k,parking_id}:Props)=>{
    return<>
        <div className="flex-col justify-center bg-gray-100 p-5 mb-2 rounded-xl">
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