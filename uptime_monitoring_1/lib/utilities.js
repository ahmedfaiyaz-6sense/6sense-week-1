const crypto = require('crypto')
const utility={}

utility.parseJson=(content)=>{
    let output = {}
    try{
        //console.log(content)
        output=JSON.parse(content)
        
    }catch(err){
        console.log(err)
        output={}
    }
    //console.log("X:")
    //console.log(output)
    return output
}

utility.hash=(random_)=>{
    if ( typeof(random_) === 'string' && random_.length>0){
        const hash = crypto.createHmac('sha256','password').update('skjdksdjsd').digest('hex')
        return hash
    }else{
        return random_
    }
}

module.exports=utility