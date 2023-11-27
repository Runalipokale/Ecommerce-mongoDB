
const http = require('http');

const server= http.createServer(function(req,res){
   res.write("Your server created sucessfully!!");
   res.end();
});

//for creating connection between server to browser
server.on('connection',(socket)=>{
   console.log("New connection..")
   
});

server.listen(3000);

console.log("Listening on port 3000..");