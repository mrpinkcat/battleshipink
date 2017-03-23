var socket = io();

var userName,
    userId,
    gameId;

$('#username-input').keypress(function(e) {
    if (e.which == 13) {
        socket.emit('username', $('#username-input').val());
    }
});

function logOk() {
    $('#menu').removeClass('invisible');
    $('#main-title').typed({
        strings: ['Bonjour commandant ' + userName + ' !'],
        typeSpeed: 40,
        showCursor: false,
        callback: function() {
            $('#cols').fadeIn(500);
            onFadeIn();
        }
    });
}

socket.on('username-ok', function(newUserId) {
    userName = $('#username-input').val();
    userId = newUserId;
    $('#username-input').val('');
    $('#login-bc').fadeOut(500, function() {
        logOk();
    });
});

socket.on('username-error', function() {
    $('#username-input').effect('shake');
    $('#username-rules').css('color', 'red');
    $('#username-input').css('color', 'red');
    $('#username-input').css('border-bottom', '2px solid red');
});
