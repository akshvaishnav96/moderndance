require("dotenv").config();

const express  = require("express");
const app  = express();
const port = process.env.PORT || 3000;
const bcrypt = require("bcryptjs")
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const {contact,Signup} = require("./static/schemas/schemas.js")
const auth = require("./static/javasc/auth")

const cookieParser = require("cookie-parser")


app.use("/static",express.static("static"))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded());

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_CONNECT);
}




app.get("/", (req,res)=>{
    res.status(200).render("../pages/main.pug");
})

app.get("/home",auth, (req,res)=>{
 
    res.status(200).render("../pages/dance.pug");
})

app.get("/tranning",auth,(req,res)=>{
    res.status(200).render("../pages/tranning.pug")
})

app.get("/classes",auth,(req,res)=>{
    res.status(200).render("../pages/classes.pug")
})
 


app.get("/login",(req,res)=>{
    res.status(200).render("../pages/login.pug")
})

app.post("/login",async(req,res)=>{
try {
    let email = req.body.email;
    let useremail = await Signup.findOne({email:email})
    let password  = req.body.password;
    const match = await bcrypt.compare(password,useremail.password)
    const token = await useremail.generateAuthToken()

    res.cookie("login",token,{
            expires: new Date(Date.now()+30000000),
            httpOnly:true, 
        })


   if(match){
    res.status(200).render("../pages/dance.pug")
   } 
   else{
    res.status(200).render("../pages/login.pug", {valid:"is-invalid"})
   }
   
    
} catch (error) {
    res.status(200).render("../pages/login.pug", {valid:"is-invalid"})
 
}


})

app.get("/Signup",(req,res)=>{
    res.status(200).render("../pages/Signup.pug")
})
app.post(`/Signup`,async (req,res)=>{
    const email = req.body.email;
    const dbemail = Signup.findOne({email:email})
    try {
        if(dbemail !== email){
                let mydata =new Signup({
                name:req.body.name,
                email:req.body.email,
                mobile:req.body.mobile,
                age:req.body.age,
                password:req.body.password
                })
                const token = await mydata.generateAuthToken()

                    res.cookie("Signup",token,{
                        expires: new Date(Date.now()+30000000),
                        httpOnly:true
                    })
                
                await mydata.save()
                res.status(201).render("../pages/Signupsuccess.pug")
            }
            else{
                res.status(200).render("../pages/Signup.pug",{valid:"is-invalid"})
            }
           
    } catch (error) {
        res.status(200).render("../pages/Signup.pug" , {valid:"is-invalid"})               
    
    
    }})
    
    app.get("/profile",auth,async(req,res)=>{
        try {
            
            res.render("../pages/profile.pug" , {name:req.user.name , email:req.user.email , age:req.user.age, mobile:req.user.mobile})
        } catch (error) {
            
        }
    }) 
    
    app.post("/profile",auth,async(req,res)=>{
        try {
            let update = await Signup.updateMany({name:req.body.name, email:req.body.email,age:req.body.age, mobile:req.body.mobile})
            res.status(200).render("../pages/dance.pug",{block:"block"})
        } catch (error) {
            res.status(200).render("../pages/dance.pug",{block:"block"})

        }
    })
    
   



app.get("/contact",auth,(req,res)=>{
    res.status(200).render("../pages/contact.pug")
})

app.post(`/contact`,auth,async(req,res)=>{
try {
    let myData =  new contact(req.body);
    await myData.save()
    res.status(200).render("../pages/formSuccess.pug")
} catch (error) {
    res.status(200).render("../pages/contact.pug" ,{valid:"is-invalid" , placeholder:"Already Used"}) 
}  
    })

app.get("/logout",auth,async(req,res)=>{
    try {

        req.user.tokens = req.user.tokens.filter((elem)=>{
            return elem.token !== req.token;
        })
         res.clearCookie("login")
        await req.user.save();
        res.render("../pages/main.pug")
        } catch (error) {
            res.render("../pages/main.pug")
    }
})

app.get("/logoutall",auth,async(req,res)=>{
    try {
        req.user.tokens = []
         res.clearCookie("login")
        await req.user.save();
        res.render("../pages/main.pug")
        } catch (error) {
        console.log("the error is : " +error)
    }
})



app.listen((port),()=>{
    console.log(`app is running at port:${port}`)
})

