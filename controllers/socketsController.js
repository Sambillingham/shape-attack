var app = require('../app');

module.exports.init = function(socket){

    socket.on('player',  function(data){
        console.log(' connection good ', data );

        app.io.sockets.emit('game-players', { player: data.player } );

    });

    socket.on('shape', function(data){

        app.io.sockets.emit('player-update', data );
    });

    socket.on('move', function(data){

        console.log(data);
    });

};
