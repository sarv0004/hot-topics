const container = document.querySelector(".container");
const errorContainer = document.querySelector(".error");
let url = "./partials/home.html";
const links = document.querySelectorAll("nav a");

ajaxHandle(url);

function handleEvent(event) {
    
  for (let i = 0; i < links.length; i++) {
      if (links[i].hasAttribute("id")) {
          links[i].removeAttribute("id");
      }
  }

  let currentItem = event.currentTarget;    
  currentItem.setAttribute("id", "active");
}

for (let link of links) {
  link.addEventListener("click", handleEvent);
}

function handleLinkClick (event) {
  event.preventDefault();

  let currentLink = event.target;
  let url = currentLink.href;    
  ajaxHandle(url);
}

for (let link of links) {
  link.addEventListener("click", handleLinkClick);
}

function ajaxHandle(urlParam) {
  fetch(urlParam)
     .then(function (response) {
        if (response.statusText === "OK") {
            return response.text();
        }
            throw new Error(response.statusText)
        })
     .then(function (data) {
         //use your partials
         container.innerHTML = data;
     })
     .catch(function (err) {
        errorContainer.textContent = `${err.name}: ${err.message}`;
     });  
} 
