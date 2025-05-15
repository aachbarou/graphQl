import { Homepage } from "./app.js";
export let UserId = 0 ;
export function  GenerateToken(email , password , Errorelem) {
    const credentials = btoa(`${email}:${password}`); 
    // Jwt Token
    fetch("https://learn.zone01oujda.ma/api/auth/signin" , {
        method : "POST",
        headers : { 
            'Content-Type': 'application/json',
            'Authorization': `Basic ${credentials}`
        },
    })
        .then(res => {
                return res.json();
        })
        .then(data => {
            if  (data.error) {
              Errorelem.setText(data.error);
              Errorelem.style.display = 'block';
               setTimeout(() => {
                   Errorelem.style.display = 'none';
               } , 2000);
                
                return ;
            }
            console.log(data);
            localStorage.setItem('token', data);
            localStorage.setItem('UserId' , GetUserId());
            Homepage(); 
          })
}

export  async function GetUserId() {
    try {
      const response = await fetch('https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ query: "{ user { id } }" }),
      });
  
      const data = await response.json();
  
      if (data.errors) {
        console.error('Error fetching data:', data.errors);
        login();
        return null;
      }
      localStorage.setItem('UserId', data.data.user[0].id);
      const Id = data.data.user[0]
      console.log("This is ID:", Id);
      return Id;
  
    } catch (error) {
      console.error('Error fetching user ID:', error);
      return null;
    }
  }