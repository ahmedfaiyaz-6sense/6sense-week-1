const express = require("express");
const adminRouter = express.Router();
const publicRouter = express.Router()

adminRouter.get('/',(req,res)=>{
    res.send({
        'panel':"Admin Panel",
        "stats":{
            "amount":20,
            "profit":"+30",
        }
    })
})



/*public router */
const log =(req,res,next)=>{
    console.log("Logging- Base URL: "+req.baseUrl+" original URL: "+req.originalUrl+" Method: "+req.method)
    
    next()
}


//all functon
publicRouter.all('*',log)
/// req param

/*publicRouter.param((param,options)=>(req,res,next,val)=>{
    if(val==options){
        next()
    }else{
        res.sendStatus(403)
    }
})
publicRouter.param('user',1)*/
publicRouter.param('user',(req,res,next,id)=>{
    req.user = id==='1'? 'Admin':'user'
    next()
})


///router.route method
publicRouter.route('/shop').all((req,res,next)=>{
    console.log("Logging user")
    next()
}).get((req,res)=>{
    res.send("GET")
}).post((req,res)=>{
    res.send("POST")
}).put((req,res)=>{
    res.send("PUT")
})


// Ger request if /:user = matches /1 ---> /999999 then pass it to param with id param takes `user` as input
publicRouter.get('/:user',(req,res)=>{
    res.send("Designation: "+req.user)
})
publicRouter.get('/',(req,res)=>{
    res.send("Public Router")
})



module.exports={
    adminRouter,
    publicRouter
}