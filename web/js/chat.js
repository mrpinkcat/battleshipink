/*global userName*/

function logToChat(globalOrGID) {
    if (globalOrGID == 'global') {
        socket.emit('user-connected-to-chat-global', userName);
    }

    if (typeof globalOrGID == 'number') {
        socket.emit('user-connected-to-chat-gid');
    }
}

$('#input-chat').keypress(function(e) { // quand on appuie sur enter sur le chat global
    if (e.which == 13) {
        socket.emit('user-message-to-chat-global', userName, $('#input-chat').val());
        $('#input-chat').val('');
    }
});

$('#btn-chat').click(function() { // quand on clique sur le boutton envoyé sur le chat global
    socket.emit('user-message-to-chat-global', userName, $('#input-chat').val());
    $('#input-chat').val('');
});

// sockets

socket.on('chat-global-print', function(formatHtml) {
    $('#content-chat').append(formatHtml);
});

socket.on('chat-global-error-string-0', function() {
    console.log('erreur tu ne tape rien'); // todo
});