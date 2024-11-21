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
handler.createRandomString=()=>{
    return Math.random().toString().substring(2,)
}
handler._token.post=(reqProps,callback)=>{
    
    const password = typeof reqProps.queryStringObject?.password === 'string'? reqProps.queryStringObject?.password : false

    const phone = typeof reqProps.queryStringObject?.mobile_number === 'string'? reqProps.queryStringObject?.mobile_number : false
    if(phone && password){
     
        data_module.read('user',phone,(err,userData)=>{
            let hashedPassword=hash(password)
            if (hashedPassword===userData.password){
                const tokenId=handler.createRandomString()
                
                const expires=Date.now()+60*60*1000
                const tokenObj={
                    phone,
                    tokenId,
                    expires
                }
                data_module.create('tokens',tokenId,tokenObj,(err)=>{
                    if(!err){
                        callback(200,tokenObj);
                    }else{
                        callback(500,{
                            error:"Token Object not created"
                        })
                    }
                })
            }else{
                callback(500,{
                    error:"Password does not match"
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

    const token_id = typeof reqProps.body?.token_id === 'string' ? reqProps.body?.token_id : false
    if (token_id){

        data_module.read('tokens',token_id,(err,tokenInfo)=>{
            if(!err && tokenInfo){
                callback(200,{
                    message:"Token found",
                    tokenInfo
                })
            }
            else{
                callback(500,{
                    message:"Server Error"
                })
            }
        })
    }else{
        callback(404,{
          message:"Token id not found"  
        })
    }

}

handler._token.put=(reqProps,callback)=>{
    const token_id = typeof reqProps.body?.token_id === 'string' ? reqProps.body?.token_id : false
    const extend=typeof reqProps.body?.extend === 'boolean' ? reqProps.body?.extend : false
    if(token_id && extend){
        data_module.read('tokens',token_id,(err,tokenInfo)=>{
            if (!err && tokenInfo){
                let expire_date=Number(tokenInfo.expires)
                let current_time = Number(Date.now())
                console.log("Expire Date: ",expire_date)
                console.log("Current Time: ",current_time)
                if(expire_date>current_time){
                    expire_date+=60*60*1000 /// 1000 miliseconds =1 second token extended for 1 hour or 3600 seconds
                    tokenInfo.expire_date=expire_date.toString()
                    data_module.update('tokens',token_id,tokenInfo,(err)=>{
                        if(err){
                            callback(500,{
                                error:"Error updating token"
                            })
                        }else{
                            callback(200,{message:"Token updated successfully"})
                        }
                    })
                }else{
                    callback(200,{
                        message:"Token already expired"
                    })
                }
            }else{
                callback('404',{
                    error:"Token not found."
                })
            }
        })
    }else{
        callback(404,{
            error:"Invalid fields"
        })
    }
}

handler._token.delete=(reqProps,callback)=>{
    const token_id = typeof reqProps.body?.token_id === 'string' ? reqProps.body?.token_id : false
    if (token_id){
        data_module.delete('tokens',token_id,(err)=>{
            if(!err){
                callback(200,{
                    message:"Token deleted."
                })
            }else{
                callback(500,{
                    error:"Token was not found."
                })
            }
        })
    }
}
module.exports=handler