const { DEBUG } = require('../env');

module.exports = {
    zk_collection_name: DEBUG ? 'zk_hotels_test' : 'zk_hotels',
    sp_collection_name: DEBUG ? 'sp_hotels_test' : 'sp_hotels'
}