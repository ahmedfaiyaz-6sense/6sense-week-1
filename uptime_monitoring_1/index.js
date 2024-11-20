const http=require('http');

const {handleReqRes}=require('./helpers/handleReqRes')
const environment = require('./helpers/environments')
//const data = require('./lib/data')
const app={};
/*data.create('test','db',{
    'message':'Data Stored'
},(err)=>{
    console.log(err)
})
data.read((err,data)=>{
    if(!err){
        console.log(data.toString())
    }
    else{
        console.log(err)
    }
})

data.update('New data',(err)=>{
    console.log(err)
})
data.delete((err)=>{
    console.log(err)
})*/
app.config={
    port:3000
};

app.createServer=()=>{
    //create server
    const server=http.createServer(app.handleRequest)
    server.listen(environment.port,()=>{
        console.log("App is running on "+environment.port)
    })
}

app.handleRequest=handleReqRes
app.createServer()