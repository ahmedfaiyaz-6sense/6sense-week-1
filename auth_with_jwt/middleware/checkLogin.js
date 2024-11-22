const jsonWebToken = require("jsonwebtoken")
require('dotenv').config()

const check_login=(req,res,next)=>{
    const auth_token= req.headers.authorization
    try{
        const token = auth_token.split(' ')[1]
        const decoded= jsonWebToken.verify(auth_token,process.env.Secret)
        const {username,userId}=decoded
        req.username=username
        req.userId=userId
        req.loginSuccess=true
        next()
    }catch{
        req.loginSuccess=false
        next()
    }
}   
module.exports=check_login