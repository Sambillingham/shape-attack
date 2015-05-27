var express = require('express');
var morgan = require('morgan');
var http = require('http');
var jade = require('jade');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// Modules
var socketsController = require("./controllers/socketsController");

//set up static files
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

//routes 
server.listen(process.env.PORT || 8080, function(){
	console.log('starting server...');
});

app.get('/', function(res,res){
	res.render('index');
});

app.get('/controller', function(res,res){
	res.render('controller');
});

app.get('/game', function(res,res){
	res.render('game');
});

io.sockets.on('connection', socketsController.init );

module.exports.io = io;
