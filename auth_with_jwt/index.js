const express = require('express')
const mongoose = require('mongoose')
const user_route = require('./userHandler')

app = express()

app.use(express.json())
app.use('/user',user_route)

mongoose.connect('mongodb://localhost/todos',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("Connection successful")).catch((err)=>console.log(err))

//app.use('/todo',user_route)
app.listen(3000,()=>{
    console.log("Listening to port: "+3000)
})