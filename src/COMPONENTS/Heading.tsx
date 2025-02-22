interface props{
    heading : string
}

export default ({heading}:props)=>{
    return<>
       <div className="text-2xl font-bold justify-items-center p-1 text-green-600">
           <div>{heading}</div>
        </div>
    </>
}