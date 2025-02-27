import React from "react"

interface props{
    icon : React.ReactNode,
    label : String,
    textColor: string

}

export default ({icon,label,textColor}:props)=>{
   
  return (
    <div className={`px-2 py-2 items-center  text-xs sm:text-sm hover:bg-green-800 transition-colors duration-200 flex flex-col sm:flex-row  text-${textColor}`}>
    
      <div className="flex justify-center">{icon}</div>
      
      <div className="sm:ml-2">{label}</div> {/* Add margin for spacing on large screens */}
      <div className=""></div>
    </div>
  );
  
}