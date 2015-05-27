
var app = {
	init: function(){
		this.socketConnect();
		this.socketEvents();

		//  UI Actions
		this.uiActions();
		this.deviceMove();
	},
	socketConnect : function(){
        this.socket = io();

        this.player = prompt('what is your name?');
        $('h1').text(this.player);

        this.socket.emit('player', { name : this.player } );
    },
    socketEvents : function() {

    	// incomming events here

    },
    deviceMove: function(){

    	window.ondeviceorientation = function(event) {

            var deviceRollX = Math.floor(event.gamma);

        	switch(true){
        		case (deviceRollX < -40) :
        			this.setColor('red')
        		break;
        		case (deviceRollX < 0) :
        			this.setColor('green')
        		break;
        		case (deviceRollX > 40) :
        			this.setColor('blue')
        		break;
        		case (deviceRollX > 0) :
        			this.setColor('yellow')
        		break;
        	}

        }.bind(this);

    },
    setColor: function(color){
    	$('body').removeClass();
    	$('body').addClass(color);
    	this.currentColor = color;
    },
    uiActions: function(){

    	var self = this;

    	$('.shape').on('touchend', function(){

	        self.socket.emit('shape', {
	        	player : self.player ,
	        	shape: $(this).data('shape'),
	        	color: self.currentColor

	        });
    	});
    }
}

app.init();
