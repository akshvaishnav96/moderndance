const mongoose = require("mongoose");
const jwt  = require("jsonwebtoken")
const bcrypt= require("bcryptjs")

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
        
    },
    class: {
       type:String,
       required:true,
    },

    email: {
        type:String,
        required:true,
        validator:true,
        unique:true,
    },
    gender:{
    type:String,
    required:true
    },
    
    age: {
        type:Number,
        required:true,        
    },

    address:{
        type:String,
        required:true,
        trim:true
    }
  });

  const signupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        uppercase:true,
    },
    email:{
        type:String,
        required:true,
        validator:true,
        unique:true,
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
    
    },
    tokens:[{
        token:{
            type:String,
            require:true
        }
    }]
    
  });

  signupSchema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token:token}) 
        await this.save()
        return token
    } catch (error) {
        res.send("the error is here"+ error)
        console.log(error)
    }
  }

 signupSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
        next()
    }
 })


  const contact = mongoose.model('contact', contactSchema);
  const Signup = mongoose.model(`Signup`,signupSchema) 

module.exports = {contact,Signup} 