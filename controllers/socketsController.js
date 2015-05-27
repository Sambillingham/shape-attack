var app = require('../app');

module.exports.init = function(socket){

    socket.on('player',  function(data){
        app.io.sockets.emit('new-player', data );
    });

    socket.on('shape', function(data){

        app.io.sockets.emit('player-update', data );
    });

    socket.on('move', function(data){

        console.log(data);
    });

};
