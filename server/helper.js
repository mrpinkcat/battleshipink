var moment = require('moment');

moment.locale('fr');

exports.log = function(text) {
    console.log('[' + moment().format('HH:mm:ss') + '] ' + text);
};

exports.chatConectHtml = function(userName) {
    return '<span id="connected-chat"><center>' + userName + ' vient de se connecter</center></span>';
};

exports.chatMessageHtml = function(userName, message) {
    return '<span id="message-chat"><span id="message-chat-user-name">' + userName + ':</span> ' + message + '</span><br>';
};