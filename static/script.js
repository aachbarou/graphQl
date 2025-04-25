import { ce  , div , button , input}  from "./createlem.js";
import { GenerateToken  } from "./api.js";
import  { Auth } from "./Auth.js";

export function login() {
    const body = document.body;
    const container = div('container');

    const left = div('left').append(
        ce('img', '').setAtr('src', './images/undraw_login_weas.svg').setAtr('alt', 'Login Image')
    );

    const right = div('right').append(
        ce('h2', '', 'Member Login'),
        input('email', 'Email'),
        input('password', 'Password'),
        ce('p', 'error', 'Invalid username or password'),
        button('login-btn', 'LOGIN'),
    );
    container.append(left, right);
    body.append(container);
    document.querySelector('.login-btn').addEventListener('click', () => {
        const email = document.querySelector('input[name="Email"]').value;
        const password = document.querySelector('input[name="Password"]').value;
        GenerateToken(email, password , document.querySelector('.error'));
    })
}
//login();
Homepage();
//  Error  page 
export  function  Homepage(){
    const body = document.body;
   body.innerHTML = ""; 
    const header = div("header")
        .append(
            div("logo", "OOOO"),
            div("nav")
                .append(
                    button("nav-btn", "Home"),
                    button("nav-btn", "Profile"),
                    button("nav-btn", "Logout")
                )
        );
    
    body.append(header);
    
}
function Error(){
    const body = document.body = "eRROR" ; 


}
