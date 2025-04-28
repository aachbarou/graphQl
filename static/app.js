import { ce  , div , button , input}  from "./createlem.js";
import { GenerateToken  } from "./api.js";
import  { Auth } from "./Auth.js";
import { query } from "./Query.js";
let  Data = null;
export function login() {
    const body = document.body;
    body.innerHTML = "";
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

export  async function  Homepage(){
    
    console.log("home   page");
try {
    const response = await fetch('https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ query })
    });
    const data = await response.json();
    // Process the data as needed
    if  (data.errors) {
        login();
        return 
    }
    Data = data['data'];
    //  chart  building

} catch (error) {
    console.error('Error fetching data:', error);
}
    let body = document.body;
   body.innerHTML = ""; 
    const header = div("header")
        .append(
            div("logo", '').append(
                ce('img', '').setAtr('src', './images/LOGO.svg').setAtr('alt', 'Logo')
            ),
            div("nav")
                .append(
                    button("nav-btn home-btn", "Home"),
                    button("nav-btn profile-btn", "Profile"),
                    button("nav-btn logout-btn", "Logout")
                )
        );
    const chart1  =  div("chart1" )
    body.append(header );
    addEventListeners();
    // document.getElementsByClassName("chart1")[0].innerHTML = Chart;
    document.querySelector('.home-btn').classList.add('window_active');

}

function Lougout(){
    localStorage.removeItem('token');
    Data =  null
    Auth();
}

function Profile() {
    if (!Data){
        login();
        return
    }
    console.log(Data)
    //  add  class active  
    document.querySelector('.profile-btn').classList.add('window_active');
    let body = document.body;
    if (body.querySelector('.profile')) {
        body.querySelector('.profile').remove();
    }
   // body.innerHTML = ""; // Clear the body to ensure a fresh profile display
    
    // Create Profile container
    let profile = div("profile").append(
        // Profile Header Section
        ce('section', 'profile-header').append(
            ce('h1', '', 'Profile'),
            ce('img', '').setAtr('src', 'https://www.svgrepo.com/show/512692/profile-1336.svg').setAtr('alt', 'Profile Icon')
        ),
        
        // Profile Body Section
        div('profile-body').append(
            // Name Section
            ce('section', 'name').append(
                 // First Name Section
            ce('section', 'firstname').append(
                ce('p', '', 'First Name'),
                ce('h2', '', `${Data.user[0].firstName}`)
            ),
            
            // Last Name Section
            ce('section', 'lastname').append(
                ce('p', '', 'Last Name'),
                ce('h2', '', `${Data.user[0].lastName}`)
            ),
            ),
            // audit and email 
            div ('audit-email').append(
                // Email Section
                ce('section', 'Email').append(
                    ce('img', '').setAtr('src', 'https://www.svgrepo.com/show/473944/email.svg').setAtr('alt', 'Email Icon'),
                    ce('p', '', 'Email'),
                    ce('h2', '', `${Data.user[0].email}`)
                ),
                
                // Audit Ratio Section
                ce('section', 'Audit-Ratio').append(
                    ce('img', '').setAtr('src', 'https://www.svgrepo.com/show/518874/ratio.svg').setAtr('alt', 'Audit Icon'),
                    ce('p', '', 'Audit Ratio'),
                    ce('h2', '', `${(Data.user[0].auditRatio).toFixed(2)}KB`)
                )
            ),
            
           
        )
    );
    
    body.append(profile); // Append the profile to the body
}
function  addEventListeners() {
    document.querySelector('.home-btn').addEventListener('click', () => {
        Homepage();
    });
    document.querySelector('.profile-btn').addEventListener('click', () => {
        Profile();
    });
    document.querySelector('.logout-btn').addEventListener('click', () => {
        Lougout();
    });
}
Auth();