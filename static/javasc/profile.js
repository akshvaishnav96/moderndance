

function changeHandler(){
  let val = document.getElementById("ageval")
  if (Number(val.value) > 120)
  {
    val.classList.add("is-invalid")
    val.value = 120
  }
  else if((Number(val.value) < 120)){
    val.classList.remove("is-invalid")
  }
}
changeHandler()

let contactvalue = (val)=>{
  if(val.value == ""){
      val.value= val.placeholder
  }
  }
  contactvalue(val)
