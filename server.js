const _PORT = process.env.PORT || 3000;

var express = require('express'),
    app = require('express')(),
    server = require('http').createServer(app),
    helper = require('./server/helper'),
    game = require('./server/core'),
    io = require('socket.io')(server);

var userId = 0,
    gameId = 0;

server.listen(_PORT, function() {
    helper.log('Server up on :' + _PORT);
});

app.use('/css', express.static(__dirname + '/web/css/'));
app.use('/js', express.static(__dirname + '/web/js/'));

app.get('/', (req, res) => {
    res.sendFile('web/index.html', {
        root: __dirname
    });
});

// sockets

io.on('connection', function(socket) {
    socket.on('username', function(name) {
        if (game.checkUsername(name) == 'ok') {
            socket.emit('username-ok', userId);
            helper.log(name + ' connected. ID : ' + userId);
            userId++;
            return;
        }
        if (game.checkUsername(name) == 'error') {
            socket.emit('username-error');
            return;
        }
    });
});
