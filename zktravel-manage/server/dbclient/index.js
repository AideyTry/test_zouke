const { DEBUG } = require('../env');

module.exports = requireRoot('../../common/mongoClient/init')({
    zk_hotels: {
        db: 'zouke',
        collection: 'zk_hotels_bk'
    },
    sp_hotels: {
        db: 'zouke',
        collection: 'all_hotels'
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
    }
})