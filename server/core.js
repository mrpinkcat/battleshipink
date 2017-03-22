exports.checkUsername = function(name) {
        if (name.length < 3 || name.indexOf(' ') > -1) {
            return 'error';
        }
        if (name.length > 3) {
            return 'ok';
        }
};