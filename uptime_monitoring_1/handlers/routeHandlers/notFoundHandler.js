const notFoundHandler={}
notFoundHandler.handle=(reqProps,callback)=>{
    callback(404,{
        message:"Requested url not found"
    })
}

module.exports=notFoundHandler