const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jsonWebToken = require("jsonwebtoken")
const router = express.Router();
const userSchema = require("./userSchema");
const login_check_middleware = require('./middleware/checkLogin')
require('dotenv').config()
//console.log(todoSchema)
const User = new mongoose.model("User", userSchema);
//get all the todos
router.get('/',(req,res)=>{
    res.send({
        'message':"Working"
    })
})


router.post('/signup',async (req,res)=>{
    
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    const newUser=new User({
        name:req.body.name,
        username:req.body.username,
        status:"active",
        password:hashedPassword

    })
    await newUser.save().then((data)=>{
        
        res.send({
            message:"successfull",
            user_id:data._id,
            username:data.username,
            name:data.name,
            status:data.status

        })
    }).catch((err)=>{
        res.send({
            message:"Error"
        })
    })
    
})

router.post('/login',async (req,res)=>{
    const user = await User.find({username:req.body.username})
    if(user && user.length>0){
        console.log(user)
        const isValidPassword=await bcrypt.compare(req.body.password,user[0].password)
        if (isValidPassword){
            const jwt=jsonWebToken.sign({
                name:user[0].name,
                id:user[0]._id
            },process.env.Secret,{
                expiresIn:'1h'
            })
            res.send({
                access_token:jwt
            })
            
        }else{
            res.status(401).json({
                "error":"Authentication failure"
            })
        }
    }else{
        res.send({
            message:"Error invalid username or password"
        })
    }
})

router.get('/protected_route',login_check_middleware,(req,res)=>{
    if(req.loginSuccess){
        res.send({
            message:"Login is successfull"
        })
    }else{
        res.send({
            message:"Login failed"
        })
    }
})
module.exports = router
