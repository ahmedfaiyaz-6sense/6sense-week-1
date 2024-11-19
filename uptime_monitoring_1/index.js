const http=require('http');

const {handleReqRes}=require('./helpers/handleReqRes')
const app={};
app.config={
    port:3000
};

app.createServer=()=>{
    //create server
    const server=http.createServer(app.handleRequest)
    server.listen(app.config.port,()=>{
        console.log("App is running on "+app.config.port)
    })
}

app.handleRequest=handleReqRes
app.createServer()