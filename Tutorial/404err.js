 const express = require('express');

 const app = express();

 app.use((req,res,next)=>{
     res.status(404).send('<h2>Page not found</h2>');
 })

 app.listen(3000);