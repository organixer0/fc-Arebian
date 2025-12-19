self.addEventListener("install",e=>{
  e.waitUntil(
    caches.open("arebian").then(c=>c.addAll([
      "./","./index.html","./style.css","./script.js","./logo.png"
    ]))
  );
});
