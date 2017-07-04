const { DEBUG, TAILER_API_PORT, DES_PWD } = require('../../config');

module.exports = {
    DEBUG,
    SESS_KEY: 'sess',
    SESS_DIR: '.koasess-tailer-api',
    PORT: TAILER_API_PORT,
    DES_PWD,

    AppId: 'wxdee0a34632fd34ee',
    AppSecret: '09fb30364a22e960f034a486bdd4dc15'
}