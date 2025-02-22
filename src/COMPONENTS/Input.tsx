import React from "react";

interface Props {
  label: string;
  type?: string;
  placeholder: string | undefined;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name : string
}

export default ({label,placeholder,type,onChangeHandler,name} : Props)=>{
    return(
        <>
         <div className="pb-3">
                <h1 className=" p-1 pl-4 font-bold ">{label}</h1>
                <div className="flex flex-col items-center">               
                    <input className="border rounded w-11/12 p-2 m-1" name={name} type={type} placeholder={placeholder} onChange={onChangeHandler}></input>
                </div>    
            </div>  
        </>
    )
}