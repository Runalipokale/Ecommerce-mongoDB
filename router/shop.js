
const express= require('express');

//for using product controller in this file
const productController = require('../controller/product');

const router  = express.Router();

router.get('/',productController.getProducts); //at '/' router expoting product controller data

module.exports =router; //exporting this file module to another file