interface Props{
    buttonName : string,
    onClickHandler : () => void;
}

export default ({buttonName,onClickHandler}:Props)=>{
    return<>
       <button onClick={onClickHandler} className="mt-4 px-4 py-2 bg-green-600 text-white rounded ">
                  {buttonName}
                </button>
    </>
}