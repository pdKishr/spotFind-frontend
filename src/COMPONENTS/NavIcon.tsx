import React from "react"

interface props{
    icon : React.ReactNode,
    label : String,
    textColor: string
}

export default ({icon,label,textColor}:props)=>{
   
    return<>
          <div className={`px-2 py-2 flex items-center rounded-sm text-sm  hover:bg-green-900 transition-colors duration-200`} style={{color: textColor}}>
            {icon}
            <div className="mx-0.5"> </div>
            {label}
          </div>
    </>
}