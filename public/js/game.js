
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

        this.socket.on('new-player', function(data){
            this.addPlayer(data);
        }.bind(this));

        this.socket.on('player-update', function(data){
            this.checkScore(data);
        }.bind(this));

    },
    addPlayer: function(data){
        $('.player__names').append('<div class="name ' + data.name +'">'+ data.name+'</div>');
        $('.player__scores').append('<div class="score ' + data.name +' "></div>');

    },
    checkScore : function(data){

        if(data.shape === this.currentShape && data.color === this.currentColor) {

            this.updateScore(data);
        }
    },
    updateScore: function(data){
        var width = parseInt( $('.score.' + data.player).css('width') );
        $('.score.' + data.player).stop().animate({'width': parseInt(width) + 10 });

        if( width + 10 > 550){
            console.log(data);

            this.gameOver(data.player);
        }
    },
    gameLoop: function(){

        var shapes = ['square', 'hex', 'triangle', 'circle'];
        var colors = ['red', 'yellow','green', 'blue'];
        var cssColors = ['#FF7163', '#FBD667','#8BFAA8', '#4B97FB'];

        setInterval( function(){
            this.currentColor = colors[Math.round(Math.random() * 3 )];
            this.currentShape = shapes[Math.round(Math.random() * 3 )];


            $('.score-shape img').attr('src','/img/' + this.currentColor + '-' + this.currentShape + '.png');

            $('.distract-text').text(shapes[Math.round(Math.random() * 3 )]);
            $('.distract-text').css('color', cssColors[Math.round(Math.random() * 3 )]);

        }.bind(this), 3000)   
    },
    gameOver: function(name){
        $('.game-over .player').text(name + ' wins!')
        $('.game-over').fadeIn();
    }
}

app.init();
