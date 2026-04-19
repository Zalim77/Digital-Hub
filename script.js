const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");

// OPEN MENU
toggle.addEventListener("click", (e) => {
  e.stopPropagation();
  nav.classList.toggle("active");
});

// CLICK INSIDE MENU
nav.addEventListener("click", (e) => {
  e.stopPropagation();
});

// CLICK OUTSIDE → CLOSE
document.addEventListener("click", () => {
  nav.classList.remove("active");
});

// CLICK LINK → CLOSE
document.querySelectorAll(".nav-links a").forEach(link=>{
  link.addEventListener("click",()=>{
    nav.classList.remove("active");
  });
});

// SEARCH + SUGGESTIONS
const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestions");

const toolsList = ["Canva Pro","ChatGPT Premium","SEO Tool","Veo 3","HeyGen AI","Cursor AI","Gemini Pro","ElevenLabs AI","Claude AI","Suno AI","Leonardo AI","CapCut Pro","VidIQ Boost","Nord VPN","Surfshark VPN","SEMrush","Moz Pro"];

if(searchInput){
searchInput.addEventListener("keyup", function () {

let input = searchInput.value.toLowerCase();
let tools = document.querySelectorAll(".searchable");

suggestionsBox.innerHTML = "";

tools.forEach(tool => {
let text = tool.innerText.toLowerCase();
tool.style.display = text.includes(input) ? "block" : "none";
});

let filtered = toolsList.filter(item => item.toLowerCase().includes(input));

filtered.forEach(item=>{
let div=document.createElement("div");
div.innerText=item;
div.classList.add("suggestion-item");

div.onclick=()=>{
searchInput.value=item;
suggestionsBox.innerHTML="";
};

suggestionsBox.appendChild(div);
});
});
}

// 3D TILT
function tilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    card.style.transform = `rotateX(${ -y/12 }deg) rotateY(${ x/12 }deg) scale(1.05)`;
}

// RESET
function reset(card) {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
}

// RIPPLE CLICK EFFECT
function ripple(e) {
    const card = e.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(card.clientWidth, card.clientHeight);

    circle.style.width = circle.style.height = diameter + "px";
    circle.style.left = e.clientX - card.getBoundingClientRect().left - diameter/2 + "px";
    circle.style.top = e.clientY - card.getBoundingClientRect().top - diameter/2 + "px";

    circle.style.position = "absolute";
    circle.style.background = "rgba(56,189,248,0.4)";
    circle.style.borderRadius = "50%";
    circle.style.transform = "scale(0)";
    circle.style.animation = "rippleAnim 0.6s linear";
    
    card.appendChild(circle);

    setTimeout(() => circle.remove(), 600);
}

// Ripple animation
const style = document.createElement("style");
style.innerHTML = `
@keyframes rippleAnim {
    to {
        transform: scale(4);
        opacity: 0;
    }
}`;
document.head.appendChild(style);



let slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide() {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");

    index++;
    if (index >= slides.length) index = 0;
}

// Change every 4 seconds
setInterval(showSlide, 4000);