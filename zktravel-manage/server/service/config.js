const { DEBUG } = require('../env');

module.exports = {
    zk_collection_name: DEBUG ? 'zk_hotels_bk' : 'zk_hotels',
    sp_collection_name: DEBUG ? 'all_hotels' : 'sp_hotels'
}