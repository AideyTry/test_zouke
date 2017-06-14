const path = require('path');
const root = __dirname;

global.requireRoot = function(p){
    return require(path.resolve(root, p));
}

const { DEBUG } = require('./env');

if(DEBUG) global.require = require;