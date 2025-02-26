import NavIcon from "./NavIcon"

interface Props{
    heading : string,
    subHeading : string | undefined | boolean | number,
    icon : React.ReactNode
}

export default ({heading,subHeading,icon}:Props)=>{
    return <>
      <div className="flex items-center p-2">

        <div className="mx-5">
            <NavIcon icon={icon} label="" textColor={`black`}/>
        </div>

        <div className=" justify-items-start">
            <div className="text-black ">   {heading}    </div>
            <div className="text-gray-500"> {subHeading} </div>
        </div>
      
     </div>
    </>
}