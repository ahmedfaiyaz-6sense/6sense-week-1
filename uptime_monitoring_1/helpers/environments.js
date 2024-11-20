const environments={}

environments.stagings={
    port:3000,
    envName:"staging"
}

environments.production={
    port:80,
    envName:"production"
}


const current_environment = typeof(process.env.NODE_ENV) === 'string'? process.env.NODE_ENV:'staging'


const environments_to_export = typeof(environments[current_environment])==='object'?environments[current_environment]:environments.stagings



module.exports=environments_to_export