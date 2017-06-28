const { DEBUG } = require('../env');

module.exports = requireRoot('../../common/mongoClient/init')({
    zk_hotels: {
        db: 'zouke',
        collection: 'zk_hotels'
    },
    sp_hotels: {
        db: 'zouke',
        collection: 'sp_hotels'
    },
    
    zk_zones: {
        db: 'zouke',
        collection: 'zk_zones'
    },
    wx_user: {
        db: 'zouke',
        collection: 'wx_user'
    },
    zkmanager_user: {
        db: 'zouke',
        collection: 'zkmanager_user'
    },
    offline_order: {
        db: 'zouke',
        collection: 'offline_order'
    },

    // old map数据
    zk_ht_map_old: {
        db: 'zouke',
        collection: 'zk_ht_map'
    },
    // gps map数据
    zk_ht_map_gps: {
        db: 'zouke200',
        collection: 'sp_hotels_gps_map_result'
    }
})