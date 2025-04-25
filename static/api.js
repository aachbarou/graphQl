
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
            if  (res.status == 401 || res.status == 200)  {
                return res.json();
            }
            ErrorPage();
        })
        .then(data => {
            if  (data.error) {
                Errorelem.setText(data.error);
                Errorelem.style.display = 'block';
                return ;
            }
            console.log(data );
            localStorage.setItem('token', data);
        })
}

