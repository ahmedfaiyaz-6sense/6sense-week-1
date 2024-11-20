const handler={}
handler.handle=(reqProps,callback)=>{
    
    callback(201,{
        message:'Sample req. recieved'
    })
}

module.exports=handler