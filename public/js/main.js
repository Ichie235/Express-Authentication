// For responsive navigation bar

function toggleNavbar(){
    navBar = document.querySelector(".nav-bar")
    navBar.classList.toggle("active")
}
let hamburger = document.querySelector(".hamburger")
hamburger.addEventListener('click', toggleNavbar)