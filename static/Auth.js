import  { Homepage, login } from "./app.js";
export  function  Auth() {
   let  Jwtoken = localStorage.getItem('token'); let  UserId = localStorage.getItem('UserId');
  console.log('User  id  local storage' ,UserId);
   if (!Jwtoken || !UserId) {
        login();
        return 
    }
    Homepage();
}