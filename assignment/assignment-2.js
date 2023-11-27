//create a express app which funnels the request from to middleware functions that log something to the console and return one response
const express = require('express');
var app = express();

app.use('/users',(req,res,next)=>{
    console.log('Text pass!')
    res.send('<h1>Your are login to next page</h1>');
});

app.use('/',(req,res,next)=>{
    console.log('Runnning...');
    res.send('<h1>Welcome to server 3000</h1>');
    next();
});

app.listen(3000);