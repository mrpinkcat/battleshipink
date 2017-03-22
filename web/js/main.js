var socket = io();

var userId,
    gameId;

$('#username-input').keypress(function(e) {
    if (e.which == 13) {
        socket.emit('username', $('#username-input').val());

        socket.on('username-ok', function(newUserId) {
            userId = newUserId;
            $('#username-input').val('');
            $('#login-bc').fadeOut(500);
        });

        socket.on('username-error', function() {
            $('#username-input').effect('shake');
            $('#username-rules').css("color", "red");
            $('#username-input').css("color", "red");
            $('#username-input').css("border-bottom", "2px solid red");
        });
    }
});