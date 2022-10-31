function getpsvalue() {
  const pass = document.getElementById("pass").value;
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

  if (pass.length >0 && !regex.exec(pass) || pass.length >15) {
      this.pass.classList.add("is-invalid");
} else if (pass.length >= 10 && regex.exec(pass) && pass.length <= 15) {
    this.pass.classList.remove("is-invalid");
    this.pass.classList.add("is-valid");

  }
}
getpsvalue();


function getcpsval() {
  const pass = document.getElementById("pass").value;
  const cpass = document.getElementById("cpass").value;

  if (pass !== cpass && cpass.length > 5) {
    this.cpass.classList.add("is-invalid");
      }
          else if(pass===cpass && cpass.length >8){
            this.cpass.classList.remove("is-invalid");
            console.log("isinvalid")
    }
}
getcpsval();

mobilevalid = ()=>{
  const mobile = document.getElementById("mobile").value

  let regex = /^([0|\+[(91)]{1,2})?([6-9][0-9]{9})$/
  

  if(regex.exec(mobile)){
    this.mobile.classList.remove("is-invalid")
    console.log("remove")
  }
  else if(mobile.lenght !==10 && mobile.length > 0){
    this.mobile.classList.add("is-invalid")
    console.log("add")
  }
}

mobilevalid();


function changeHandler(val)
{
  if (Number(val.value) > 120)
  {
    val.classList.add("is-invalid")
  }
  else if((Number(val.value) < 120)){
    val.classList.remove("is-invalid")
  }
}
changeHandler()
