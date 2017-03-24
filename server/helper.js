var moment = require('moment');

moment.locale('fr');

exports.log = function(text) {
    console.log('[' + moment().format('HH:mm:ss') + '] ' + text);
};

exports.chatConectHtml = function(userName, userId) {
    return '<span id="connected-chat"><center>' + userName + ' #' + userId + ' vient de se connecter</center></span>';
};

exports.chatMessageHtml = function(userName, userId, message) {
    return '<span id="last-message" style="display: none;"><span id="message-chat-user-name">' + userName  + ' #' + userId + ' :</span> ' + message + '</span><br>';
};