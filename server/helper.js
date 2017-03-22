var moment = require('moment');

moment.locale('fr');

exports.log = function(text) {
    console.log('[' + moment().format('HH:mm:ss') + '] ' + text);
};
