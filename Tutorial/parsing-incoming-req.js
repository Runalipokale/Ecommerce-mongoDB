const express = require('express');
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.use('/users',(req,res,next)=>{
    res.send('<form action="/product" method="POST"><input type="text" name="product-name"><button type="submit">Add Product</button></form>');
});

app.use('/product',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/');
});

app.use('/',(req,res,next)=>{   
    res.send('<h1>Welcome to server 3000</h1>');
    next();
});

app.listen(3000);