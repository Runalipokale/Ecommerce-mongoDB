const path = require('path');
const express = require('express');
//for using product controller in this file
const productController = require('../controller/product');
const router = express.Router();

//get request for getting product data
router.get('/add-product',productController.getAddProduct);

//post request for posting product data
router.post('/add-product',productController.postAddProduct);

//sendfile method
// router.get('/product',(req,res,next)=>{
//   res.sendFile(path.join(__dirname,'../','views','add-product.html'));
// })


module.exports = router; // exporting this file module to another file