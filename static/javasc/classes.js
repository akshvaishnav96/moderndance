let area = document.querySelectorAll(".imgN")
for(items of area){
  Array.from(area).forEach((e)=>{

    e.addEventListener("mouseover",()=>{
       let img = e.children;
       Array.from(img).forEach((e)=>{
        e.style.filter = "invert(0)"
       })
    })
})
}

for(items of area){
  Array.from(area).forEach((e)=>{

    e.addEventListener("mouseout",()=>{
       let img2 = e.children;
       Array.from(img2).forEach((e)=>{
        e.style.filter = "invert(1)"
       })
    })
})
}
