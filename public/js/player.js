console.log('good to go');

var app = {
	init: function(){

		this.socketConnect();
		this.socketEvents();

		this.uiActions();
		this.deviceMove();
	},
	socketConnect : function(){
        this.socket = io();

        this.player = prompt('what is your name?');

        $('h1').text(this.player);

        this.socket.emit('player', { data : this.player } );
    },
    socketEvents : function() {

        this.socket.on('update-status', function(data){
            this.displayStatus(data);
        }.bind(this));

    },
    deviceMove: function(){

    	window.ondeviceorientation = function(event) {

            var deviceDirection = Math.floor(event.alpha),
                deviceRollY     = Math.floor(event.beta),
                deviceRollX     = Math.floor(event.gamma);


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
        			this.setColor('orange')
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
	    	$('body').removeClass('');

	        self.socket.emit('shape', {
	        	player : self.player ,
	        	shape: $(this).data('shape'),
	        	color: self.currentColor

	        });
	        console.log({
	        	player : self.player ,
	        	shape: $(this).data('shape'),
	        	color: self.currentColor

	        })

    	});


    }
}

app.init();
