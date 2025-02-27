interface props{
    buttonName : String
    onClickHandler : () => void;
}

export default ({buttonName, onClickHandler}:props)=>{
    return<>
    <div className="bg-white w-fit h-9 rounded-sm p-2 border  border-green-400 mx-1">
        <div className="mx-1  text-green-500 text-sm font-medium">
        <button onClick={onClickHandler}>{buttonName}</button>
        </div>    
    </div>       
    </>
}