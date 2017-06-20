const connectConfig = {};
const collectionConfig = {};

module.exports = function register(type, config){
    switch(type){
        case 'connect':
            Object.assign(connectConfig, config);
            break;
        case 'collection':
            Object.assign(collectionConfig, config);
            break;
    }
};

module.exports.connectConfig = connectConfig;
module.exports.collectionConfig = collectionConfig;