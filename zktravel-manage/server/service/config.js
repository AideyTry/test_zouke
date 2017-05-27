const { DEBUG } = require('../env');

module.exports = {
    zk_collection_name: 'zk_hotels',
    sp_collection_name: DEBUG ? 'sp_hotels_test' : 'sp_hotels'
}