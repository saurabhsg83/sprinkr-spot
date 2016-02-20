var express = require("express");
var app     = express();
var path    = require("path");


app.get('/',function(req,res){
  res.sendFile(__dirname + '/dist/index.html');
  //__dirname : It will resolve to your project folder.
});

app.use(express.static(__dirname + '/dist'));

app.listen(8080);

console.log("Running at Port 8080");
