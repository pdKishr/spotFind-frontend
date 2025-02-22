import axiosInstance from "../AXIOS_INSTANCE/api_instance"

interface Props{
    id   : number
    name : string ,
    email : string,
    mobileNumber : string
}

export default  async({id,name,email,mobileNumber}:Props)=>{
     try{
        const response = await axiosInstance.put("/user/update",{
            name,
            email,
            mobileNumber
        },
        {
            headers:{id}
        })

        return response.data;
     }
     catch(error:any){
        alert(JSON.stringify(error.response.data.error));
     }
}