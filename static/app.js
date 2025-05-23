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
    const Powerdby  = () => {
        return div('Powerdby').append(
            ce('a' , '' , 'Powered By aachbaro').setAtr('href' , 'https://www.linkedin.com/in/ahmed-achbarou/').setAtr('target' , '_blank')
        )
    }
    body.append(container , Powerdby());
    
    document.querySelector('.login-btn').addEventListener('click', () => {
        const email = document.querySelector('input[name="Email"]').value;
        const password = document.querySelector('input[name="Password"]').value;
        GenerateToken(email, password , document.querySelector('.error'));
    })
}

export  async function  Homepage(){  
   console.log("this is token" , localStorage.getItem('token'));
  
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
     if (data.errors || !data.data || !data.data.user) {
            console.error('Error fetching data:', data.errors ? data.errors : 'No user data');
            login();
            return;
        }
    console.log("data  errrr " , data.data);
    if  (data.errors) {
        console.error('Error fetching data:', data.errors);
        login();
        return 
    }
    Data = data['data'];

} catch (error) {
    console.error('Error fetching data:', error);
}
    let body = document.body;
    body.removeAttribute('class');
   body.innerHTML = ""; 
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
    div('Chart-section fade-in delay-1').append(ce('h1' , '' , 'Projects by XP'),
                        div('CercleSvg').setAtr('id' , 'CercleSvgSetion')).append(ce('p' , 'barinfo' , 'Bar Info : ').append(ce('span' , 'projectname' , 'Hover over a bar to see the project Information'), ce('span' , 'projectxp' , '').setAtr('id' , 'projectxp'))),
)
    body.append(header , ce('br')  , Container );
    document.querySelector('.home-btn').classList.add('window_active');

    CercleSvg();
    getxps(Data);
    document.body.append(XpAmount());
    addEventListeners();
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
    document.querySelector('.profile-btn').classList.add('window_active');
    document.querySelector('.home-btn').classList.toggle("window_active")
    let body = document.body;
    if (body.querySelector('.profile')) {
        body.querySelector('.profile').remove();
    }
    let Container = document.querySelector('.Container');
    Container.innerHTML = "";
    let profile = div("profile").append(
        ce('section', 'profile-header').append(
            ce('h1', '', 'Profile'),
            ce('img', '').setAtr('src', 'https://www.svgrepo.com/show/316473/user-1.svg').setAtr('alt', 'Profile Icon')
        ),
        div('profile-body').append(
            ce('section', 'name').append(
            ce('section', 'firstname').append(
                ce('p', '', 'First Name'),
                ce('h2', '', `${Data.user[0].firstName}`)
            ),
            ce('section', 'lastname').append(
                ce('p', '', 'Last Name'),
                ce('h2', '', `${Data.user[0].lastName}`)
            ),
            ),
            div ('audit-email').append(
                ce('section', 'Email').append(
                    ce('img', '').setAtr('src', 'https://www.svgrepo.com/show/473944/email.svg').setAtr('alt', 'Email Icon'),
                    ce('p', '', 'Email'),
                    ce('h2', '', `${Data.user[0].email}`)
                ),
                ce('section', 'Audit-Ratio').append(
                    ce('img', '').setAtr('src', 'https://www.svgrepo.com/show/518874/ratio.svg').setAtr('alt', 'Audit Icon'),
                    ce('p', '', 'Audit Ratio'),
                    ce('h2', '', `${(Data.user[0].auditRatio).toFixed(2)}KB`)
                )
            ),
        )
    );
    Container.append( profile);
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
    let cn = document.querySelector(".polygone-section");
    if (!cn) return;
    const width = cn.clientWidth;
    const height = Math.min(width, 350);
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    const transactions = Data.user[0].transactions;
    const maxXP = 100;

    if (!transactions || transactions.length === 0) {
        console.error("No transactions found.");
        return;
    }
    const oldSvg = document.getElementById("svgChart100");
    if (oldSvg) oldSvg.remove();
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("id", "svgChart100");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    const container = document.querySelector("#polygone");
    if (!container) {
        console.error("Container #polygone not found.");
        return;
    }
    container.append(svg);
    const points = [];
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

    transactions.forEach(({ type, amount }, i) => {
        const normalized = amount / maxXP;
        const angle = (2 * Math.PI / transactions.length) * i;
        const x = centerX + normalized * radius * Math.cos(angle);
        const y = centerY + normalized * radius * Math.sin(angle);
        points.push({ x, y });

        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", 5);
        circle.setAttribute("fill", "#00c6ff");
        svg.appendChild(circle);

        const label = document.createElementNS(svgNS, "text");
        const offsetX = 10 * Math.cos(angle);
        const offsetY = 10 * Math.sin(angle);
        label.setAttribute("x", x + offsetX);
        label.setAttribute("y", y + offsetY);
        label.setAttribute("font-size", "10");
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("alignment-baseline", "middle");
        circle.addEventListener("mouseover", () => {
            label.textContent = type;
        });
        circle.addEventListener("mouseout", () => {
            label.textContent = "";
        });
        svg.appendChild(label);
    });

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

function getxps(data) {
    let xps = data.user[0].xps;
    XPS = xps.filter((xp) => (!xp.path.includes("piscine-") || xp.path == "/oujda/module/piscine-js")).map(xp => xp.amount).reduce((a, b) => a + b, 0);
    let xpsAMount = xps.filter((xp) => (!xp.path.includes("piscine") && xp.path.split("/").length == 4));
    let somme = parseInt(xpsAMount.map(xp => xp.amount).reduce((a, b) => a + b, 0));
    somme = somme / 1000;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("id", "svgChart200");
    let section = document.querySelector(".CercleSvg");
    const height = 300;
    const padding = 50;
    const minBarWidth = 40; // px per bar
    // Calculate minimum SVG width needed for all bars
    const minSvgWidth = Math.max(section.clientWidth, xpsAMount.length * minBarWidth + 2 * padding);
    svg.setAttribute("width", minSvgWidth); // SVG will be at least this wide
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", `0 0 ${minSvgWidth} ${height}`);
    const barAreaWidth = minSvgWidth - 2 * padding;
    const barWidth = Math.max(10, (barAreaWidth - (xpsAMount.length - 1) * 10) / xpsAMount.length);
    const spacing = 10;
    const maxXP = Math.max(...xpsAMount.map(t => t.amount).map(t => t / 1000));
    const chartHeight = height - 2 * padding;
    if (maxXP === 0) {
        console.error("Maximum XP value is 0, cannot create chart.");
        svg.innerHTML = "Maximum XP value is 0, cannot create chart.";
        return;
    }
    xpsAMount.forEach((xp, index) => {
        const amount = xp.amount / 1000;
        const barHeight = Math.max(0, (chartHeight / maxXP) * amount);
        const x = padding + index * (barWidth + spacing);
        const y = height - padding - barHeight;
        const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bar.setAttribute("x", x);
        bar.setAttribute("y", y);
        bar.setAttribute("width", barWidth);
        bar.setAttribute("height", barHeight);
        bar.setAttribute("fill", "green");
        svg.append(bar);

        const prjn = document.querySelector('.projectname'); const xpAmount = document.querySelector('#projectxp');
        bar.addEventListener("mouseover", () => {
        bar.setAttribute("fill", "#00b894");
        prjn.textContent = xp.path.split("/").pop()+"  " + "";
        xpAmount.textContent = `${Math.round(amount)}KB`;
        });
        bar.addEventListener("mouseout", () => {
            bar.setAttribute("fill", "green");
            prjn.textContent = "Hover over a bar to see the project Information"; xpAmount.textContent = "";
        });
    });

    section.innerHTML = "";
    section.append(svg);
}

window.addEventListener("resize", () => {
    CercleSvg();
    getxps(Data);
});

let XPS =  0;
function XpAmount(){
let Container =  document.createElement("div")
Container.setAttribute("id", "XPINFO")
Container.append(
    div("XpAmount" ).append(
        ce('h1', '', 'Xp Amount'),
        ce('span', '', `${Math.round(XPS / 1000)}KB`)
    ) ,
    div("User" ).append(
        ce('h1', '', 'Login'),
        ce('span', '', `${Data.user[0].login}`)
)
);
return Container
}
