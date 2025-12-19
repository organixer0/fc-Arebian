const ADMIN_CODE="arebian2025";
let current="home";

function go(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  current=id;
  window.scrollTo(0,0);
}

function admin(){
  const code=prompt("Admin passcode:");
  if(code===ADMIN_CODE) go("admin");
  else alert("Access denied");
}

/* Theme */
const btn=document.getElementById("themeBtn");
btn.onclick=()=>{
  document.body.classList.add("switching");
  setTimeout(()=>{
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
    btn.textContent=document.body.classList.contains("dark")?"☀️":"🌙";
    document.body.classList.remove("switching");
  },300);
};

/* Media */
const grid=document.getElementById("mediaGrid");
let media=JSON.parse(localStorage.getItem("media"))||[];

function render(){
  grid.innerHTML="";
  media.forEach(m=>{
    const d=document.createElement("div");
    d.className="media-item";
    d.onclick=()=>open(m);
    d.innerHTML=m.type.startsWith("image")
      ? `<img src="${m.data}">`
      : `<video src="${m.data}" controls></video>`;
    grid.appendChild(d);
  });
}

function upload(){
  [...fileInput.files].forEach(f=>{
    const r=new FileReader();
    r.onload=e=>{
      media.push({type:f.type,data:e.target.result});
      localStorage.setItem("media",JSON.stringify(media));
      render();
    };
    r.readAsDataURL(f);
  });
}

function open(m){
  lightboxContent.innerHTML=
    m.type.startsWith("image")
    ? `<img src="${m.data}">`
    : `<video src="${m.data}" controls autoplay></video>`;
  lightbox.style.display="flex";
}
function closeBox(){lightbox.style.display="none";}

render();

/* Swipe */
let x=0;
document.addEventListener("touchstart",e=>x=e.touches[0].clientX);
document.addEventListener("touchend",e=>{
  const d=e.changedTouches[0].clientX-x;
  const pages=["home","news","media","matches"];
  let i=pages.indexOf(current);
  if(d>80&&i>0)go(pages[i-1]);
  if(d<-80&&i<pages.length-1)go(pages[i+1]);
});

/* PWA */
if("serviceWorker"in navigator){
  navigator.serviceWorker.register("sw.js");
}
