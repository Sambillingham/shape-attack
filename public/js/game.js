
var app = {
	init: function(){

		this.socketConnect();
		this.socketEvents();
        this.gameLoop();
	},
	socketConnect : function(){
        this.socket = io();
    },
    socketEvents : function() {

        this.socket.on('game-player', function(data){
            // append player name
            this.players.push({ name: data.player, score: 0 });
            // $('.players').append('<div ')
        }.bind(this));

        this.socket.on('player-update', function(data){
            // update player score
            console.log(data);
            this.updateScore(data);
        }.bind(this));

    },
    updateScore : function(data){

        this.currentShape = 'square';
        this.currentColor = 'red';

        if(data.shape === this.currentShape && data.color === this.currentColor) {

            var width = parseInt( $('.score.' + data.player).css('width') );
            console.log(width);
            $('.score.' + data.player).stop().animate({'width': parseInt(width) + 10 });
        }
    },
    renderScore: function(player){
    },
    gameLoop: function(){

        var shapes = ['square', 'hex', 'triangle', 'circle'];
        var colors = ['red', 'yellow','green', 'blue'];
        var cssColors = ['#FF7163', '#FBD667','#8BFAA8', '#4B97FB'];


        setInterval( function(){
            console.log( Math.floor(Math.random() * 4 ) );
            this.currentColor = colors[Math.floor(Math.random() * 3 )];
            this.currentShape = shapes[Math.floor(Math.random() * 3 )];

            $('.score-shape img').attr('src','/img/' + this.currentColor + '-' + this.currentShape + '.png');

            $('.distract-text').text(shapes[Math.floor(Math.random() * 3 )]);
            $('.distract-text').css('color', cssColors[Math.floor(Math.random() * 3 )]);

        }.bind(this), 1400)

        
    }
}

app.init();
