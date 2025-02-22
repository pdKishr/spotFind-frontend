interface props{
   subheading : string
}

export default ({subheading}:props)=>{
    return<>
    <div className="justify-items-center p-1">
            <div>{subheading}</div>
    </div>
    </>
}