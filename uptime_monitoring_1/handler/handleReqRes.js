const { parse } = require('path');
const url = require('url')
const {StringDecoder}=require('string_decoder')
const handler={}
handler.handleReqRes=(req,res)=>{
    res.write('Server is running')

    const parsedUrl= url.parse(req.url,true)
    const path_name = parsedUrl.pathname
    const trimmed_path = path_name.replace(/'^\/+|\/+$/g,'')
    const method = req.method.toLowerCase()
    const queryStringObject = parsedUrl.query
    const headerObject = req.headerObject

    const decoder = new StringDecoder('utf-8')
    let  data_recieved=""
    req.on('data',(buffer)=>{
        console.log(buffer)
        data_recieved+=decoder.write(buffer)
    })
    req.on("end",(buffer)=>{
        data_recieved+=decoder.end()
        console.log(data_recieved.toString())
    })

    res.end()
    //request handling stuffs
}
module.exports=handler
