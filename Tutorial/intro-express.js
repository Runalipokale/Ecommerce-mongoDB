//basic program using express

const express = require('express');

const app = express();

app.use('/',(req,res,next)=>{
    console.log('This is always runs !');
    next();
});

app.use('/add-product',(req,res,next)=>{
    console.log('In the middle middleware!');
    res.send('<h1>The "add product" page</h1>');
});

app.use('/',(req,res,next)=>{
    console.log('In another middleware!');
    res.send('<h1>"hello from Express!"</h1>');
});

app.listen(3000)