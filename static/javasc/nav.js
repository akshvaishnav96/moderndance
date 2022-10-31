
let navlist = document.querySelector(".v-class")
let ullist = document.querySelector(".ul-list")
let nav = document.querySelector(".nav-h");
let logo = document.querySelector(".rmv-logo")

let burger = document.getElementById("burger")
burger.addEventListener("click",()=>{
    
    ullist.classList.toggle("v-class")
    navlist.classList.toggle("v-class")
    nav.classList.toggle(`nav-h`)
    logo.classList.toggle(`rmv-logo`)

})