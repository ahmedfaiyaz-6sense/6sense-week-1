const express = require('express')
//const dashboard = require('./dashboard_api')
const {adminRouter,publicRouter}=require('./routing_example')
const app= express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Express is running.')
})

app.use('/admin_router',adminRouter)
app.use('/public_router',publicRouter)
app.listen(3000,()=>{
    console.log("Listening to port: "+3000)
})