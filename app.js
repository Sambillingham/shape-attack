var express = require('express');
var app = express();
var server = require('http').createServer(app);
server.listen(8080, function(){
	console.log('starting server');
});
//set up static files
app.use(express.static(__dirname + '/public'));

//routes 
app.get('/', function(res,res){
	res.render('index');
});

