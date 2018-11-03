const environments = {};

environments.staging = {
    httpPort : 3011,
    httpsPort : 3012
}

environments.prod = {
    httpPort : 4011,
    httpsPort : 4012
}


const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV : '';
const envObjToBeExported = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

exports.envObjToBeExported = envObjToBeExported;