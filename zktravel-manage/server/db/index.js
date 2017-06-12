const { connectString } = require('./config');
const DB = require('./DB');

module.exports.get = function(){
    return DB.use(connectString);
}