const { DEBUG, ZKTRAVEL_MANAGE_PORT, DES_PWD } = require('../../config');

module.exports = {
    DEBUG,
    SESS_KEY: 'sess',
    SESS_DIR: '.koasess-zktravel-manage',
    PORT: ZKTRAVEL_MANAGE_PORT,
    DES_PWD
}