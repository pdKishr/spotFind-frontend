import axiosInstance from "../AXIOS_INSTANCE/api_instance"
import { Parking } from "../ZUSTAND_STORE/store";



export default  async (parking : Parking )=>{
    try{
        const response = await axiosInstance.put("/parking/update",
            {
                ...parking
            }
        )

        return response.data ;
    }
    catch(error:any){
       alert(error)
    }
}