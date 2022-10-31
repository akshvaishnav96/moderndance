const jwt = require("jsonwebtoken");

const {contact,Signup} = require("../schemas/schemas")

const auth = async(req,res,next)=>{
    try {
        
        const token  = req.cookies.login;
        
        const verifyuser =  jwt.verify(token,process.env.SECRET_KEY)
        
        
        const userdata = await Signup.findOne({_id:verifyuser._id})
        
        req.user = userdata;
        req.token = token;
        
        next()
        
    } catch (error) {
        res.render(".././pages/main.pug")
    }
}

module.exports = auth;