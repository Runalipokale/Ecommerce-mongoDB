// for creating server

const http = require('http');

const Server = http.createServer(function (req, res) {

    console.log("New user!");
    // res.write("hello from post 3000");
    // res.end();


    //handle two routes "/" and "/user"
    const url = req.url;
    const method = req.method;


    if (url === "/") {
        // res.write("hello from post 3000");
        res.write('<html>');
        res.write('<head><title>User</title></head>');
        res.write('<body><form action="/create-user"  method="POST"><input type="text" placeholder="Enter your name.." name="username"><button type="submit">send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    // for sending post request and display default message
    // if (url === "/create-user") {
    //     res.write("<html>");
    //     res.write("<head><title>user</title></head>");
    //     res.write("<body><h3>User connected to server!</h3></body>")
    //     res.write("</html");
    //     return res.end();
    // }

   if(url==="/create-user" && method==="POST"){
    const body=[];
    req.on('data',(chunk)=>{
        // console.log(chunk);
        body.push(chunk);
    });

    req.on('data',()=>{
      const parcedBody = Buffer.concat(body).toString();
      console.log(parcedBody);
    });
    res.statusCode=302;
    res.setHeader('Location','/');
    res.end();
}

}).listen(3000);

