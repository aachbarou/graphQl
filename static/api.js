import { Homepage } from "./app.js";
export let UserId = 0 ;
export async  function  GenerateToken(email , password , Errorelem) {
    const credentials = btoa(`${email}:${password}`); 
    // Jwt Token
    const response = await fetch("https://learn.zone01oujda.ma/api/auth/signin" , {
        method : "POST",
        headers : { 
            'Content-Type': 'application/json',
            'Authorization': `Basic ${credentials}`
        },
    })
           const data = await response.json();
       //    console.log("this is " ,data);
            if  (data.error) {
              Errorelem.setText(data.error);
              Errorelem.style.display = 'block';
               setTimeout(() => {
                   Errorelem.style.display = 'none';
               } , 2000);
                
                return ;
            }
            localStorage.setItem('token', data);
            Homepage();       
}