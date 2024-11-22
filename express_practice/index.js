const express = require('express')
const fs= require('node:fs')
//const dashboard = require('./dashboard_api')
const {adminRouter,publicRouter}=require('./routing_example')
const profile_upload=require('./file_upload_route')
const app= express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Express is running.')
})



app.use('/profile',profile_upload)
app.use('/admin_router',adminRouter)
app.use('/public_router',publicRouter)

// error handler 
/// middleware chaining to handle error
app.get('/chaining',[
    (req,res,next)=>{
        fs.readFile('./somefile.txt','utf-8',(err,data)=>{
            if(err){
                next(err)
            }else{
                console.log("File read successfull")
            }
        })
    },
    (req,res,next)=>{
        console.log(data)
    }
])
//404 handler
app.use((req,res,next)=>{
    res.send("Request Not found")
})
app.use((err,req,res,next)=>{
    if(err.message){
        res.status(500).send(err.message)
    }else{
        res.status(500).send(err.message)
    }
})

app.listen(3000,()=>{
    console.log("Listening to port: "+3000)
})