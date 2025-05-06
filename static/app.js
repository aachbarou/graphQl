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
        console.error('Error fetching data:', data.errors);
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
   // Header build 
    const header = div("header").append(
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
    let Container =  div('Container' , '').append(
        div('polygone-section').append(
            ce('h1' , '' , 'Best skills'),
            ce('svg' , '' , '' ).setAtr('id' , 'polygone').setAtr('width' , '900').setAtr('height' , '400')
        ),
    div('Chart-section').append(ce('h1' , '' , 'Distribution of users by XP'),
                        div('chart'))
)
    body.append(header , ce('br')  , Container );
    document.querySelector('.home-btn').classList.add('window_active');

    
    transactionsvg();

    addEventListeners();
    // document.getElementsByClassName("chart1")[0].innerHTML = Chart;
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
    //  add  class active  
    document.querySelector('.profile-btn').classList.add('window_active');
    document.querySelector('.home-btn').classList.toggle("window_active")
    let body = document.body;
    if (body.querySelector('.profile')) {
        body.querySelector('.profile').remove();
    }
    let Container = document.querySelector('.Container');
    Container.innerHTML = "";
    // body.innerHTML = ""; // Clear the body to ensure a fresh profile display
    
    // Create Profile container
    let profile = div("profile").append(
        // Profile Header Section
        ce('section', 'profile-header').append(
            ce('h1', '', 'Profile'),
            ce('img', '').setAtr('src', 'https://www.svgrepo.com/show/316473/user-1.svg').setAtr('alt', 'Profile Icon')
        ),
        
        // Profile Body Section
        div('profile-body').append(
            // Name Section
            ce('section', 'name').append(
                 // First Name Section
            ce('section', 'firstname').append(
                ce('p', '', 'First Name'),
                ce('h2', '', `${Data.user.firstName}`)
            ),
            
            // Last Name Section
            ce('section', 'lastname').append(
                ce('p', '', 'Last Name'),
                ce('h2', '', `${Data.user.lastName}`)
            ),
            ),
            // audit and email 
            div ('audit-email').append(
                // Email Section
                ce('section', 'Email').append(
                    ce('img', '').setAtr('src', 'https://www.svgrepo.com/show/473944/email.svg').setAtr('alt', 'Email Icon'),
                    ce('p', '', 'Email'),
                    ce('h2', '', `${Data.user.email}`)
                ),
                
                // Audit Ratio Section
                ce('section', 'Audit-Ratio').append(
                    ce('img', '').setAtr('src', 'https://www.svgrepo.com/show/518874/ratio.svg').setAtr('alt', 'Audit Icon'),
                    ce('p', '', 'Audit Ratio'),
                    ce('h2', '', `${(Data.user.auditRatio).toFixed(2)}KB`)
                )
            ),
            
           
        )
    );
    
    Container.append( profile); // Append the profile to the body
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
function transactionsvg() {
    // Create the SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("id", "svgChart100");
    svg.setAttribute("width", "400");
    svg.setAttribute("height", "300");
    let prolygone = document.querySelector('#polygone');
    prolygone.append(svg);

    const height = 300;
    const padding = 50;
    const barWidth = 10;
    const spacing = 20;

    const transactions = Data.user.transactions;
    const maxXP = Math.max(...transactions.map(t => t.amount));
    const chartHeight = height - 2 * padding;

    if (maxXP === 0) {
        console.error("Maximum XP value is 0, cannot create chart.");
        return;
    }

    transactions.forEach((transaction, index) => {
        const amount = transaction.amount;
        const barHeight = Math.max(0, (chartHeight / maxXP) * amount);
        const x = padding + index * (barWidth + spacing);
        const y = height - padding - barHeight;

        // Draw the bar
        const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bar.setAttribute("x", x);
        bar.setAttribute("y", y);
        bar.setAttribute("width", barWidth);
        bar.setAttribute("height", barHeight);
        bar.setAttribute("fill", "steelblue");
        svg.append(bar);

        // Add skill name below each bar
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", x + barWidth / 2);
        label.setAttribute("y", height - padding + 15);
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("font-size", "9");
    
        label.textContent = transaction.type.replace("skill_", "");
        svg.append(label);

        // Add amount value above each bar
        const xpValue = document.createElementNS("http://www.w3.org/2000/svg", "text");
        xpValue.setAttribute("x", x + barWidth / 2);
        xpValue.setAttribute("y", y - 5);
        xpValue.setAttribute("text-anchor", "middle");
        xpValue.setAttribute("font-size", "10");
        xpValue.textContent = amount + "%";
        svg.append(xpValue);
    });
    
}


function CercleSvg(){
    
}