interface props{
    heading : string
}

export default ({heading}:props)=>{
    return<>
       <div className="text-2xl font-semibold justify-items-center p-1 text-green-500">
           <div>{heading}</div>
        </div>
    </>
}