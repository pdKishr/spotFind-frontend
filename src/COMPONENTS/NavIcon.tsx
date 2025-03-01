import React from "react"

interface props{
    icon : React.ReactNode,
    label : String,
    textColor : String
}

export default ({icon,label,textColor}:props)=>{
   
  return (
    <div className={`p-1  items-center  text-xs sm:text-sm hover:bg-green-700  hover:rounded transition-colors duration-200 flex flex-col sm:flex-row  `}>
    
      <div className={`flex justify-center text-${textColor} `}>{icon}</div>
      
     {label &&  <div className={`sm:ml-2 text-${textColor}`}>{label}</div>} {/* Add margin for spacing on large screens */}
      <div className=""></div>
    </div>
  );
  
}