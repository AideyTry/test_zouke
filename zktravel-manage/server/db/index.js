const { connectString } = require('./config');
const DB = require('./DB');

module.exports.get = function({ token='' } = {}){
    return DB.use(connectString, token);
}