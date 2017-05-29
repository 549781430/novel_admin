var crypto = require('crypto');
var md5 = crypto.createHash('md5');

module.exports = {
    encrypt: function(data) {
        return crypto.createHash('md5').update(data).digest('hex').toUpperCase();
    }
};