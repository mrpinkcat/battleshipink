const _PORT = process.env.PORT || 3000;

var express = require('express'),
    app = require('express')(),
    server = require('http').createServer(app),
    helper = require('./server/helper'),
    game = require('./server/core'),
    JsonDB = require('node-json-db'),
    db = new JsonDB("./db/user-db", true, true),
    io = require('socket.io')(server);

var numberOfClient = 0,
    userId = 0,
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

// db funs

function createUserInDb(socketId, userName, userId) { // création d'un utilisateur dans la db
    db.push('/' + socketId, {
        socketId: socketId,
        userName: userName,
        userId: userId
    });
}

function checkDb(socketId) {
    db.reload();
    try {
        var temp = db.getData('/' + socketId);
    }
    catch (err) {
        helper.log(socketId + ' does\'t exist in the database...');
        return 'stop-DirDontExist';
    }
    return 'ok';
}

function removeUserInDb(socketId) { // supression d'un utilisateur dans la db
    if (checkDb(socketId) == 'stop-DirDontExist')
        return;
        
    db.delete('/' + socketId);
}

function infoUserInDb(socketId, infoRequested) { // get un info d'un utilisateur dans la db. Son userName ou son userID
    if (checkDb(socketId) == 'stop-DirDontExist')
        return;

    if (infoRequested == 'userName')
        return db.getData('/' + socketId + '/userName');
    if (infoRequested == 'userId')
        return db.getData('/' + socketId + '/userId');
}

// sockets

io.on('connection', function(socket) {
    socket.on('username', function(name) {
        if (game.checkUsername(name) == 'ok') {
            socket.emit('username-ok', userId);
            helper.log(name + ' #' + userId + ' connected.');
            createUserInDb(socket.id, name, userId);
            userId++;
            return numberOfClient++;
        }
        if (game.checkUsername(name) == 'error') {
            socket.emit('username-error');
            return;
        }
    });

    socket.on('username-step-2', function(userName) { // check si le userName n'est pas vide pour éviter les bugs
        if (userName.length == 0) {
            return socket.emit('username-step-2-return', 'username-step-2-error-length-0', '<h1>! ERREUR !</h1><p>username-step-2-error-length-0</p><h3>Rechargez la page svp<h3>');
        }
        else
            return socket.emit('username-step-2-return', 'ok');
    });

    socket.on('user-connected-to-chat-global', function() {
        io.emit('chat-global-print', helper.chatConectHtml(infoUserInDb(socket.id, 'userName'), infoUserInDb(socket.id, 'userId')));
    });

    socket.on('user-message-to-chat-global', function(message) {
        if (message.length == 0) {
            return socket.emit('chat-global-error-string-0');
        }
        helper.log(infoUserInDb(socket.id, 'userName') + ' send to global chat : ' + message);
        io.emit('chat-global-print', helper.chatMessageHtml(infoUserInDb(socket.id, 'userName'), infoUserInDb(socket.id, 'userId'), message));
    });

    socket.on('disconnect', function() {
        io.emit('chat-global-print', helper.chatDisconectHtml(infoUserInDb(socket.id, 'userName'), infoUserInDb(socket.id, 'userId'))); // envois déco dans le chat
        helper.log(infoUserInDb(socket.id, 'userName') + ' #' + infoUserInDb(socket.id, 'userId') + ' disconnected')
        removeUserInDb(socket.id); // supr l'user de la db
        numberOfClient--; // réduit de 1 le nombre de clients connectés
    });
});
