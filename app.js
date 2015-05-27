var express = require('express');
var morgan = require('morgan');
var http = require('http');
var jade = require('jade');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// Modules
var socketsController = require("./controllers/socketsController");

app.set('port', process.env.PORT || 3000)
//set up static files
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

//routes 
app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
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
