export let  Data = null;
import { ce  , div , button , input}  from "./createlem.js";
import { GenerateToken  } from "./api.js";
import  { Auth } from "./Auth.js";
import { query } from "./Query.js";

export function login() {
    const body = document.body;
    body.setAttribute('class', 'login-page fade-in.delay-3');
    body.innerHTML = "";
    const container = div('container-login container-login2');

    const left = div('left').append(
        ce('img', '').setAtr('src', './images/undraw_login_weas.svg').setAtr('alt', 'Login Image')
    );
    const right = div('right').append(
        ce('h2', '', 'Member Login'),
        input('email', 'Email'),
        input('password', 'Password'),
        ce('p', 'error', 'Your email and password is required'),
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
        body: JSON.stringify({ query: await query() })
    });
    const data = await response.json();
    console.log( "data  before  parsing " ,data['data'].user);
    
    // Process the data as needed
    if  (data.errors) {
        console.error('Error fetching data:', data.errors[0].message);
        login();
        return 
    }
    Data = data['data'];
    
    //  chart  building

} catch (error) {
    console.error('Error fetching data:', error);
}
    let body = document.body;
    //  delet  the  class name  from  body  
    body.removeAttribute('class');
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
        div('polygone-section fade-in delay-2').append(
            ce('h1' , '' , 'Best skills'),
            ce('section' , '' , '' ).setAtr('id' , 'polygone')
        ),
    div('Chart-section fade-in delay-1').append(ce('h1' , '' , 'Distribution of users by XP'),
                        div('CercleSvg').setAtr('id' , 'CercleSvgSetion'))
)
    body.append(header , ce('br')  , Container );
    document.querySelector('.home-btn').classList.add('window_active');

    
    
    CercleSvg();
    getxps(Data);
    document.body.append(XpAmount());

    addEventListeners();
    // document.getElementsByClassName("chart1")[0].innerHTML = Chart;
}

function Lougout(){
    localStorage.removeItem('token' )  ;localStorage.removeItem('UserId');
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
            // audit and email polygone
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
function CercleSvg() {
    const svgNS = "http://www.w3.org/2000/svg";

    const width = 600;
    const height = 300;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 130;

    const transactions = Data.user.transactions;

    // 👇 Use global max XP for scaling (always 100%)
    const maxXP = 100;

    if (transactions.length === 0) {
        console.error("No transactions found.");
        return;
    }

    // Clear old SVG if exists
    const oldSvg = document.getElementById("svgChart100");
    if (oldSvg) oldSvg.remove();

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("id", "svgChart100");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);

    const container = document.querySelector("#polygone");
    if (!container) {
        console.error("Container #polygone not found.");
        return;
    }

    container.append(svg);

    const points = [];

    // 🟢 Draw concentric rings every 10% of 100
    for (let i = 1; i <= 10; i++) {
        const valuePercent = i / 10;
        const r = radius * valuePercent;

        const ring = document.createElementNS(svgNS, "circle");
        ring.setAttribute("cx", centerX);
        ring.setAttribute("cy", centerY);
        ring.setAttribute("r", r);
        ring.setAttribute("fill", "none");
        ring.setAttribute("stroke", "#ddd");
        ring.setAttribute("stroke-width", "0.5");
        ring.setAttribute("stroke-dasharray", "2,2");
        svg.appendChild(ring);
    }

    // 🔵 Draw skill points
    transactions.forEach(({ type, amount }, i) => {
        const normalized = amount / maxXP;
        const angle = (2 * Math.PI / transactions.length) * i;

        const x = centerX + normalized * radius * Math.cos(angle);
        const y = centerY + normalized * radius * Math.sin(angle);

        points.push({ x, y });

        // Dot
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", 5);
        circle.setAttribute("fill", "#00c6ff");
        svg.appendChild(circle);

        // Label
        const label = document.createElementNS(svgNS, "text");
        const offsetX = 10 * Math.cos(angle);
        const offsetY = 10 * Math.sin(angle);
        label.setAttribute("x", x + offsetX);
        label.setAttribute("y", y + offsetY);
        label.setAttribute("font-size", "10");
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("alignment-baseline", "middle");

        // Hover events
        circle.addEventListener("mouseover", () => {
            label.textContent = type;
        });
        circle.addEventListener("mouseout", () => {
            label.textContent = "";
        });

        svg.appendChild(label);
    });

    // 🔗 Connect all points
    for (let i = 0; i < points.length; i++) {
        const next = (i + 1) % points.length;
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", points[i].x);
        line.setAttribute("y1", points[i].y);
        line.setAttribute("x2", points[next].x);
        line.setAttribute("y2", points[next].y);
        line.setAttribute("stroke", "#4d4b4b");
        line.setAttribute("stroke-width", "1");
        svg.appendChild(line);
    }
}

let XPS =  0;
function XpAmount(){
let Container =  document.createElement("div")
Container.setAttribute("id", "XPINFO")
Container.append(
    div("XpAmount" ).append(
        ce('h1', '', 'Xp Amount'),
        ce('span', '', `${Math.round(XPS / 1000)}KB`)
    ) ,
    div("Livele" ).append(
        ce('h1', '', 'Login'),
        ce('span', '', `${Data.user.login}`)
)
);
return Container
}






function getxps(data) {

    let  xps = data.user.xps;
    XPS = xps.filter((xp)  => (!xp.path.includes("piscine-") || xp.path  == "/oujda/module/piscine-js" ) ).map(xp => xp.amount).reduce((a , b) => a + b, 0);
    let  xpsAMount = xps.filter((xp)  => (!xp.path.includes("piscine")  && xp.path.split("/").length == 4) );
  let  somme  = parseInt(xpsAMount.map(xp => xp.amount).reduce((a , b) => a + b, 0));
   somme = somme / 1000;

   const svg  = document.createElementNS("http://www.w3.org/2000/svg", "svg");
   svg.setAttribute("id", "svgChart200");
   svg.setAttribute("width", "700");
   svg.setAttribute("height", "300");
   let  section = document.querySelector(".CercleSvg"); 
   const height = 300;
   const padding = 50;
   const barWidth = 10;
   const spacing = 20;
  // const transactions = Data.user.transactions;
 
   const maxXP = Math.max(...xpsAMount.map(t => t.amount).map(t => t / 1024));
   const chartHeight = height - 2 * padding;
   if (maxXP === 0) {
       console.error("Maximum XP value is 0, cannot create chart.");
       svg.innerHTML = "Maximum XP value is 0, cannot create chart.";
       return;
   }
   xpsAMount.forEach((xp, index) => {
       const amount = xp.amount / 1024;
       const barHeight = Math.max(0, (chartHeight / maxXP) * amount);
       const x = padding + index * (barWidth + spacing);
       const y = height - padding - barHeight ;
       // draw  borders 
       const border = document.createElementNS("http://www.w3.org/2000/svg", "rect");
       border.setAttribute("x", x);
       border.setAttribute("y", y);
       border.setAttribute("width", barWidth);
       border.setAttribute("height", barHeight);
       border.setAttribute("fill", "none");
       border.setAttribute("stroke", "black");
       border.setAttribute("stroke-width", "1");
       svg.append(border);
       // Draw the bar
       const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
       bar.setAttribute("x", x);
       bar.setAttribute("y", y);
       bar.setAttribute("width", barWidth);
       bar.setAttribute("height", barHeight);
       bar.setAttribute("fill", "green");
       svg.append(bar);

       // Add skill name below each bar
       const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
       label.setAttribute("x", x + barWidth / 2);
       label.setAttribute("y", height - padding + 15);
       label.setAttribute("text-anchor", "middle");
       label.setAttribute("font-size", "9");
   
       // alert  path  whene hover on bar
       bar.addEventListener("mouseover", () => {
           label.textContent = xp.path.split("/").pop();
       });
       bar.addEventListener("mouseout", () => {
           label.textContent = "";
       });
       svg.append(label);

       // Add amount value above each bar
       const xpValue = document.createElementNS("http://www.w3.org/2000/svg", "text");
       xpValue.setAttribute("x", x + barWidth / 2);
       xpValue.setAttribute("y", y - 5);
       xpValue.setAttribute("text-anchor", "middle");
       xpValue.setAttribute("font-size", "10");
       xpValue.textContent = Math.round(amount )+ " KB";
       svg.append(xpValue);
   });


   section.append(svg);

}