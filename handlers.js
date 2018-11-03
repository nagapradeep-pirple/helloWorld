const handlers = {};

handlers.path = (data,callback) => {
    callback(200,JSON.stringify({messsage : "HelloWorld.. All Good"}));
}

handlers.notFound = (data, callback) => {
    callback(404,JSON.stringify({messsage : "Requested route is not defined"}));
}

handlers.hello = (data, callback) => {
    callback(200, JSON.stringify({messsage : "Welcome to the world of Pirple, Hello..."}));
}

exports.handlers = handlers;