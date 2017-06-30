const { DEBUG, ZKTRAVEL_WEB_PORT, DES_PWD } = require('../../config');

module.exports = {
    DEBUG,
    SESS_KEY: 'sess',
    SESS_DIR: '.koasess-zktravel-web',
    PORT: ZKTRAVEL_WEB_PORT,
    DES_PWD
}