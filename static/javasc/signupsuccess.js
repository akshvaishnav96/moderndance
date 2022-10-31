let second = 5;

let textarea = document.getElementById("textarea")

let int  = setInterval(() => {
timedecrement = ()=>{
    second -=1
textarea.innerText =  `The page will be automatically redirected in ${second} seconds...`

if(second == 0){
    window.location = "http://localhost:3000/";
    second = 0;
    clearInterval(int)
}

}
timedecrement()

},1000);

