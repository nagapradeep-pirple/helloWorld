/*
* Author Naga Pradeep from Bangalore, India
*/

const http = require('http');
const https = require('https');
const fs = require('fs');
const stringDecoder = require('string_decoder').StringDecoder;
const url = require('url');
const currentEnvironment = require('./config').envObjToBeExported;
const handlers = require('./handlers').handlers;

const httpServer = http.createServer((req,res) => {
    unifiedServer(req,res);
});

httpServer.listen(currentEnvironment.httpPort, () => {
    console.log('Server is listening now on port ', currentEnvironment.httpPort);
});

const httpsServeroptions  = {
    'key' : fs.readFileSync('./key.pem'),
    'cert' : fs.readFileSync('./cert.pem')
}
//Create server for https
const httpsServer = https.createServer(httpsServeroptions,(req,res) => {
    unifiedServer(req,res);
});

httpsServer.listen(currentEnvironment.httpsPort, () => {
    console.log('Https Server is listening now on port ', currentEnvironment.httpsPort);
})

const unifiedServer = (req,res) => {
    const method  = req.method;
    const parsedUrl = url.parse(req.url,true);
    const path = parsedUrl.pathname;
    console.log('path :::  ',path);
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');
    console.log('Request received on the path trimmedPath ::: ', trimmedPath);
    const queryString = parsedUrl.query;
    const headers = req.headers;
    
    // Prsing the payload coming in the request
    const decoder = new stringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });
    req.on('end', () => {
        buffer += decoder.end();
        console.log("payload in the eq is ::: ", buffer);
        const chooseHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : router['notFound'];
        
        const data = {
            method : method,
            path : trimmedPath,
            queryString : queryString,
            headers: headers,
            payload : buffer
        }
        chooseHandler(data,(statusCode,payloadString) => {
            res.setHeader('Content-Type','application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    })

    
    
}

const router = {
    'path' : handlers.path,
    'hello' : handlers.hello,
    'notFound' : handlers.notFound
}