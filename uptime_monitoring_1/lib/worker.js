const data_module = require('../lib/data')
const request = require('request')
const worker={}


worker.loop=()=>{
    setTimeout(worker.gatherAllChecks,1000*5)
}
// gather files from directory checks
worker.gatherAllChecks=()=>{
    
    data_module.list('checks',(stream)=>{
        const filenames=[]
        for(const filename of stream){
            filenames.push(
                filename.replace('.json','')
            )
        }
        let error_counter=0
        let counter=0
        for(const filename of filenames){
            data_module.read('checks',filename,(err,checkInfo)=>{
               
                if(!err && checkInfo){
                
                    const url = checkInfo.protocol+""+checkInfo.url
                    
                    //const url = "http://127.0.0.1:3000"
                    request(url,(error,response,body)=>{
                        if(!error){
                           
                            const lastChecked = Date.now()
                            const valid_successCodes=new Set(checkInfo.successCodes)
                            let status="UP"
                            if(valid_successCodes.has(response.statusCode)){
                                status="UP"
                                
                            }else{
                                status="DOWN"
                            }
                            console.log("STATUS of "+url+" is "+status)
                            checkInfo.status=status
                            checkInfo.lastChecked=lastChecked
                            data_module.update('checks',filename,checkInfo,(err)=>{
                                if(err){
                                    error_counter+=1
                                }else{
                                    console.log("Error: "+error)
                                }
                            })
                        
                        }else{
                            console.log("SITE: "+url+" is not reachable.")
                        }
                    })
                }else{
                    console.log(err)
                }
            })
        }
    })
}
// start the workers
worker.init=()=>{
    console.log("WORKER STARTED")
    worker.loop()
}

module.exports=worker