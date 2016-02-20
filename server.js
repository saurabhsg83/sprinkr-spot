var express = require("express");
var app     = express();
var path    = require("path");
var port = process.env.PORT || 8080;

app.get('/',function(req,res){
  res.sendFile(__dirname + '/dist/index.html');
  //__dirname : It will resolve to your project folder.
});

app.use(express.static(__dirname + '/dist'));

app.listen(port);

console.log("Running at Port 8080");
