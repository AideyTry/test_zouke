const session = require('koa-session');
const sessionStore = require('./sessionStore');

module.exports = function(options={}, app){
    if(!options.store){
        options.store = sessionStore;
    }
    return session(options, app);
}