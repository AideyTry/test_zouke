const { DEBUG } = require('../env');

if (DEBUG) {
    module.exports.zouke = {
        connect: 'mongodb://zouke:zouke123@115.29.188.30:37100/zouke',
        admin: false,
        db: ''
    };
    module.exports.zktravel = {
        connect: 'mongodb://admin:admin123@115.29.188.30:37100/admin',
        admin: true,
        db: 'zktravel'
    };
} else {
    module.exports.zouke = {};
    module.exports.zktravel = {};
}