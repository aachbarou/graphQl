import { GenerateToken  } from "./api.js";
import  { Homepage, login } from "./app.js";
export  function  Auth() {
   let  Jwtoken = localStorage.getItem('token');
    if (!Jwtoken) {
        login();
        return 
    }
    Homepage();
}