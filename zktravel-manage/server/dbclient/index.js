const { DEBUG } = require('../env');

function c(...c){
    if(DEBUG||!c[1]) return c[0];
    return c[1];
}

module.exports = requireRoot('../../common/mongoClient/init')({
    zk_hotels: c(
        {
            db: 'zouke',
            collection: 'zk_hotels'
        }, 
        {
            db: 'static',
            collection: 'zk_hotels_v2'
        }
    ),
    sp_hotels: c(
        {
            db: 'zouke',
            collection: 'sp_hotels'
        },
        {
            db: 'static',
            collection: 'sp_hotels'
        }
    ),
    zk_zones: c(
        {
            db: 'zouke',
            collection: 'zk_zones'
        },
        {
            db: 'static',
            collection: 'zk_zones_v2'
        }
    ),
    wx_user: c(
        {
            db: 'zouke',
            collection: 'wx_user'
        },
        {
            db: 'cluster',
            collection: 'wx_user'
        }
    ),
    zkmanager_user: c(
        {
            db: 'zouke',
            collection: 'zkmanager_user'
        },
        {
            db: 'cluster',
            collection: 'zkmanager_user'
        }
    ),
    offline_order: c(
        {
            db: 'zouke',
            collection: 'offline_order'
        },
        {
            db: 'cluster',
            collection: 'offline_order'
        }
    ),
/*
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
*/
})