import axios from "axios";


export default(error:any)=>{
 
  if (axios.isAxiosError(error)) 
  {
    if (error.response) {
      return error.response.data || { error: "Server error occurred." };
    } 
    else if (error.request) { 
      return { error: "Network error. Please check your internet connection." };
    }
  }

 
  return { error: "Something went wrong!" };
}