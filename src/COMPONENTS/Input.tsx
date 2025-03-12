import React from "react";

interface Props {
  label: string;
  type?: string;
  placeholder: string | undefined;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name : string,
  value : any
}

export default ({label,placeholder,type,onChangeHandler,name,value} : Props)=>{
    
    return(
        <>
         <div className="pb-3">
                <h1 className=" p-1 pl-4 font-semibold">{label}</h1>
                <div className="flex flex-col items-center">               
                    <input className="border-1 rounded w-11/12 p-2 " value={value} name={name} type={type} placeholder={placeholder} onChange={onChangeHandler}></input>
                </div>    
            </div>  
        </>
    )
}