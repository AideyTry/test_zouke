const { DEBUG, TAILER_API_PORT, DES_PWD } = require('../../config');

module.exports = {
    DEBUG,
    SESS_KEY: 'sess',
    SESS_DIR: '.koasess-tailer-api',
    PORT: TAILER_API_PORT,
    DES_PWD
}