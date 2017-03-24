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
app.use('/img', express.static(__dirname + '/web/img/'));

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
    
    socket.on('username-step-2', function(userName) {
        if (userName.length == 0) {
            return socket.emit('username-step-2-return', 'username-step-2-error-length-0', '<h1>! ERREUR !</h1><p>username-step-2-error-length-0</p><h3>Rechargez la page svp<h3>');
        }
        else
            return socket.emit('username-step-2-return', 'ok');
    });

    socket.on('user-connected-to-chat-global', function(userName) {
        io.emit('chat-global-print', helper.chatConectHtml(userName));
    });

    socket.on('user-message-to-chat-global', function(userName, message) {
        if (message.length == 0) {
            return socket.emit('chat-global-error-string-0');
        }
        helper.log(userName + ' send to global chat : ' + message);
        io.emit('chat-global-print', helper.chatMessageHtml(userName, message));
    });
});
