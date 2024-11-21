const sampleHandler=require('./handlers/routeHandlers/sampleHandler')
const userHandler=require('./handlers/routeHandlers/userHandler')
const tokenHandler = require('./handlers/routeHandlers/tokenHandler')
const checkHandler = require('./handlers/routeHandlers/checkHandler')
const routes={

/// here functionalities with proper name will be assigned like 'login':loginHandler
    sample:sampleHandler,
    user:userHandler,
    token:tokenHandler,
    check:checkHandler
}

module.exports=routes