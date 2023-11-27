//Create a Node.js Application that accepts first name, last name of a Person and define a 
//Module that concatenate first name and last name
const http= require('http');
const concat = require("./concat.js");

const server= http.createServer(function(req,res){
     res.write('<html>')
     res.write('<head><title>Username</title></head>')
     res.write('<body><input type="text" name="firstrName"><br><input type="text" name="lastName"><button>send</button></body>')
     res.write('</html>')
     res.write(person);
});


server.listen(3000);