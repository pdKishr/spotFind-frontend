interface props{
    value : string,
    label : string
}

export default ({value,label}:props)=>{
    return<>
       <div className="pb-3">
                <h1 className=" p-1 pl-4 font-bold ">{label}</h1>
                <div className="flex flex-col items-center">               
                    <input title="" className="border rounded w-11/12 p-2 m-1" value={value} type="radio"></input>
                </div>    
            </div>  
    </>
}