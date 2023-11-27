// for using express in your program
const express = require('express');
const app = express();

//for sending data to server to client 
app.get('/',function(req,res){
    res.send("Hello world");
});

//for sending data to server to client for specific data request
app.get('/alien',function(req,res){
    res.send("welcome back alien!");
});

app.get('/alien/:id',function(req,res){
    const id=req.params.id;
    res.send('heyy ali' + id);
});

//creating server for printing the message
app.listen(9000,function(req,res){
    console.log("Running...")
});
