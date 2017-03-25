/*global logToChat*/

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
            logToChat('global');
        }
    });
}

socket.on('username-ok', function(newUserId) {
    userName = $('#username-input').val();
    socket.emit('username-step-2', userName);
    socket.on('username-step-2-return', function(res, formatResHtml) {
        if (res == 'username-step-2-error-length-0') { // si il y a un bug et que le userName se retrouve vide
            console.log(userName);
            $('#login-bc').css('background-color', 'red');
            $('#username-text').remove();
            $('#username-input').remove();
            $('#username-rules').remove();
            return $('#username-conainer').append(formatResHtml);
        }
        if (res == 'ok') {
            $('#username-input').val('');
            $('#login-bc').fadeOut(500, function() {
                logOk();
            });
        }
    });
    userId = newUserId;
});

socket.on('username-error', function() {
    $('#username-input').effect('shake');
    $('#username-rules').css('color', 'red');
    $('#username-input').css('color', 'red');
    $('#username-input').css('border-bottom', '2px solid red');
})

// error screen

socket.on('disconnect', function() {
    $('#login-bc').remove();
    $('#game').remove();
    $('#menu').remove();
    $('#lost-co-screen').fadeIn(250);
});
