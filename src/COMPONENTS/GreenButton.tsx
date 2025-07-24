interface Props{
    buttonName : string,
    onClickHandler : () => void;
}

export default ({buttonName,onClickHandler}:Props)=>{
    return<div>
       <button onClick={onClickHandler} className="mt-4 px-4 py-2 bg-green-500 text-white rounded ">
                  {buttonName}
                </button>
    </div>
}