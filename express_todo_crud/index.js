const express = require('express')
const mongoose = require('mongoose')
const todo_route = require('./routeHandlers/todoHandler')
app = express()

app.use(express.json())
app.use('/todo',todo_route)

mongoose.connect('mongodb://localhost/todos',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("Connection successful")).catch((err)=>console.log(err))

app.use('/todo',todo_route)
app.listen(3000,()=>{
    console.log("Listening to port: "+3000)
})