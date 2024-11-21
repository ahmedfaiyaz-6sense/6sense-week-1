const data_module=require('../../lib/data')
const {hash}=require('../../lib/utilities')
const handler={}
handler.handle=(reqProps,callback)=>{
    const accepted_methods=new Set(['get','post','put','delete'])
    

    if (accepted_methods.has(reqProps?.method)){
        console.log(reqProps?.method)
        handler._token[reqProps?.method](reqProps,callback)
       
    }
    else{
        callback(201,{
            message:'this is token handler'
        })
    }
}
handler._token={}

handler._token.post=(reqProps,callback)=>{
    
    const password = typeof reqProps.queryStringObject?.password === 'string'? reqProps.queryStringObject?.password : false

    const phone = typeof reqProps.queryStringObject?.mobile_number === 'string'? reqProps.queryStringObject?.mobile_number : false
    if(phone && password){
     
        data_module.read('user',phone,(err,userData)=>{
            let hashedPassword=hash(password)
            if (hashedPassword===userData.password){
                const tokenId="skjdlksjdkjsd"
                const hours=100
                const expires=Date.now()+60*60*hours
                const tokenObj={
                    tokenId,
                    expires
                }
                data_module.create('tokens',phone,tokenObj,(err)=>{
                    if(!err){
                        callback(200,tokenObj);
                    }else{
                        callback(500,{
                            error:"There was a problem -1"
                        })
                    }
                })
            }else{
                callback(500,{
                    error:"There was a problem -2"
                })
            }   
        })
    }else{
        callback(404,{
            error:"Not found"
        })
    }
       

}


handler._token.get=(reqProps,callback)=>{
    const password = typeof reqProps.queryStringObject?.password === 'string' && reqProps.queryStringObject?.password?.trim() ? reqProps.queryStringObject?.password : false

    const phone = typeof reqProps.queryStringObject?.mobile_number === 'string' && reqProps.queryStringObject?.mobile_number?.trim() ? reqProps.queryStringObject?.mobile_number : false
    callback(200,{done:"done"})

}

handler._token.put=(reqProps,callback)=>{}

handler._token.delete=(reqProps,callback)=>{}
module.exports=handler