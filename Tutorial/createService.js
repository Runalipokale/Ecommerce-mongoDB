//creating a web server 
var http = require('http');

http.createServer(function(req,res){
   res.write("Your server created sucessfully!!");
   res.end()
}).listen(8080)