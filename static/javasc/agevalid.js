function agevalid(){
let val = document.getElementById("age")
  if (Number(val.value) > 120){
    val.classList.add("is-invalid")
    val.value = 0;
  }
  else if((Number(val.value) < 120)){
    val.classList.remove("is-invalid")
    
  }
}
agevalid()