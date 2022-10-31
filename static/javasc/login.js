let loginpass = ()=>{

    let loginarea = document.getElementById("password").value

    if(loginarea.length>15 ){
       let pass =  document.getElementById("password")
        pass.classList.add("is-invalid")
    }
    else if(loginarea.length <=15 ){
        pass =  document.getElementById("password")
        pass.classList.remove("is-invalid")
    }
    }
loginpass();