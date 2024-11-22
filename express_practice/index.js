const express = require('express')
//const dashboard = require('./dashboard_api')
const routing_example=require('./routing_example')
const app= express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Express is running.')
})

app.use('/routing_example',routing_example)

app.listen(3000,()=>{
    console.log("Listening to port: "+3000)
})