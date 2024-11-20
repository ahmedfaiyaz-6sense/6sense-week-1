const data = require('../../lib/data')
const {hash, parseJson}=require('../../lib/utilities')

const handler={}
handler.handle=(reqProps,callback)=>{
    const accepted_methods=new Set(['get','post','put','delete'])
    if (accepted_methods.has(reqProps?.method)){
        handler.user[reqProps?.method](reqProps,callback)
    }
    else{
        callback(201,{
            message:'this is userHandler'
        })
    }
}
handler.user={}


handler.user.post = (reqProps,callback)=>{
   
    const firstName = typeof(reqProps?.body?.firstName) === 'string' && reqProps.body?.firstName?.trim().length>0 ? reqProps?.body?.firstName : false
    const lastName = typeof(reqProps?.body?.lastName) === 'string' && reqProps.body?.lastName?.trim().length>0 ? reqProps?.body?.lastName : false
    const mobile_number= typeof(reqProps?.body?.mobile_number) === 'string' && reqProps?.body?.mobile_number.trim().length>0 ? reqProps?.body?.mobile_number : false
    const password= typeof(reqProps?.body?.password) === 'string' && reqProps?.body?.password.trim().length>0 ? reqProps?.body?.password : false

    if (firstName && lastName && mobile_number && password){
        console.log("USER OBJECT: ")
        const userObject={
            firstName,
            lastName,
            mobile_number,
            password: hash(password)
        }
        console.log(userObject)
        data.create('user',mobile_number,userObject,(err)=>{
            if(err){
                callback(500,{
                    message:'Internal Server error'
                })
            }else{
                callback(201,{
                    success:'True.',
                    message:'User created'
                })
            }
        })
    }else{
        callback(404,{
            message:"Invalid Fields"
        })
    }
}
handler.user.put = (reqProps,callback)=>{
    const phone = typeof reqProps.queryStringObject?.mobile_number === 'string' && reqProps.queryStringObject?.mobile_number?.trim() ? reqProps.queryStringObject?.mobile_number : false
    console.log("PUT")
    data.read('user',phone,(err,userInfo)=>{
        if(!err && d){
            const firstName = typeof(reqProps?.body?.firstName) === 'string' && reqProps.body?.firstName?.trim().length>0 ? reqProps?.body?.firstName : false
            const lastName = typeof(reqProps?.body?.lastName) === 'string' && reqProps.body?.lastName?.trim().length>0 ? reqProps?.body?.lastName : false
            const mobile_number= typeof(reqProps?.body?.mobile_number) === 'string' && reqProps?.body?.mobile_number.trim().length>0 ? reqProps?.body?.mobile_number : false
            const password= typeof(reqProps?.body?.password) === 'string' && reqProps?.body?.password.trim().length>0 ? reqProps?.body?.password : false
            if (firstName || lastName || mobile_number || password){ 
                console.log("One or more field needs to be updated")
                data.update('user',phone,userInfo,(err)=>{
                    if(err){
                        callback(500,{
                            'message':'Internal server error'
                        })
                    }else{
                        if(userInfo.firstName)
                            userInfo.firstName=firstName
                        if(userInfo.lastName)
                            userInfo.lastName=lastName
                        if(userInfo.mobile_number)
                            userInfo.mobile_number=mobile_number
                        if(userInfo.password)
                            userInfo.password=password
                    }
                    callback(201,{'message':'User updated'})
                })
            }else{
                callback(500,{
                    'message':'Invalid fields'
                })
            }
        }
    })  
}
handler.user.get = (reqProps,callback)=>{
    console.log(reqProps)
    const phone = typeof reqProps.queryStringObject?.mobile_number === 'string' && reqProps.queryStringObject?.mobile_number?.trim() ? reqProps.queryStringObject?.mobile_number : false
    data.read('user',phone,(err,data)=>{
        callback(200,{
            user:parseJson(data)
        })
    })

}

handler.user.put = (reqProps,callback)=>{

}

handler.user.delete = (reqProps,callback)=>{

}

module.exports=handler