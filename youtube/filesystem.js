// program for read a file
var fs=require('fs')

fs.readFile('module.js','utf-8',function (err,data){
    console.log(data)
})

//for write a file

var fs = require('fs')

fs.writeFile('app.js','console.log("Done!")',function(err){
    console.log("Data save")
})

// for modifying a file

var fs = require('fs')

fs.appendFile('index.js','console.log("Done!")',function(err){
    console.log("Data save")
})

//for delete any file

var fs = require('fs')

fs.unlink('app.js',function(err){
    console.log("Deleted")
})
