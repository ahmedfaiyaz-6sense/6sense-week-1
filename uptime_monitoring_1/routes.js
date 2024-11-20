const sampleHandler=require('./handlers/routeHandlers/sampleHandler')
const userHandler=require('./handlers/routeHandlers/userHandler')
const routes={

/// here functionalities with proper name will be assigned like 'login':loginHandler
    sample:sampleHandler,
    user:userHandler
}

module.exports=routes