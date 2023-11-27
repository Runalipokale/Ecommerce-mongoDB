// sending a request to server
const http = require('http')
const fs = require('fs');

const server=http.createServer(function(req,res){
    res.setHeader('content-type','text/html');
    res.write('<html>');
    res.write('<head><title></title></head>');
    res.write('<body><h1>Hello from node.js server!</h1></body>')
    res.write('</html>');
    res.end();
});

server.listen(3000);

