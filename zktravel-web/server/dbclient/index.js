const { DEBUG } = require('../env');

module.exports = requireRoot('../../common/mongoClient/init')({
    offline_order: {
        db: 'zouke',
        collection: 'offline_order'
    },
    wx_user: {
        db: 'zouke',
        collection: 'wx_user'
    }
})