const path = require('path');

const express = require('express');
const bodyParser = require('body-parser'); 

const errController = require('../controller/error');
const mongoConnect = require('../utils/database').mongoConnect;


const app = express();

app.use(express.static('views'));
app.use(express.static('public'));


// using template engine for dynamic content views
//using pug template engine
// app.set('view engine', 'pug'); 

app.set('view engine', 'ejs');
app.set('views','views'); 

const adminRoutes = require('../router/admin');
const shopRoutes = require('../router/shop');


app.use(bodyParser.urlencoded({extended:false})); //for passing body of request with application
app.use(express.static(path.join(__dirname, 'public')));// join path of public folder

app.use((req,res,next)=>{
    // User.findByPk(1)
    // .then(user=>{
    //     req.user =user;
    //     next();
    // })
    // .catch(err=>console.log(err));
    next();
})

app.use('/admin',adminRoutes); // for use admin.js data in this module
app.use(shopRoutes); // for use shop.js data in this module


// res,send method
// app.use((req,res,next)=>{
//     res.status(404).send("<P>Page not found</P>");   
//     res.end;
//  });
 

// another way to send 404 page not found err by adding html file path
app.use(errController.getError);

mongoConnect(()=>{
    app.listen(3000);
});