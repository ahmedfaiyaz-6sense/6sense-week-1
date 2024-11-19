///data stream read example
//const fs = require('fs')


//const fileReadStream = fs.createReadStream('data.txt')
//fileReadStream.on('data',(chunk)=>{
//    console.log(chunk.toString())
//})

/// http server to read data
const http=require('http')
const server = http.createServer((req,res)=>{
    if(req.url==='/readstream'){
        res.write('<form action="/process" method="POST"><label for="input-box">Enter something:</label> <input type="text" id="input-box" name="input-box" required> <button type="submit">Submit</button></form>')
        res.end()
    }
    else if (req.url==='/process' && req.method==='POST'){
        console.log(req)
        total_data=[]
        req.on('data',(chunk)=>{
            console.log(chunk)
            total_data.push(chunk)
        })
        req.on('end',()=>{
            console.log("Total data read finish.")
            console.log(total_data)
        })
        res.write('File submitted')
        res.end()
        console.log("Request recieved..")
    }
})  



server.listen(3000)
console.log("Server is running on port 3000")