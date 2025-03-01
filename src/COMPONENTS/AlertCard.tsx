interface props{
    message :string
}
export default ({message} : props)=>{
    return<>
    <div className="mx-2 px-3 py-0 text-xs text-red-500 flex justify-between">
    {message}
    </div>
    
    </>
}