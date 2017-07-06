const { DEBUG } = require('../env');

function c(...c){
    if(DEBUG||!c[1]) return c[0];
    return c[1];
}

module.exports = requireRoot('../../common/mongoClient/init')({
    offline_order: c(
        {
            db: 'zouke',
            collection: 'offline_order'
        },
        {
            db: 'cluster',
            collection: 'offline_order'
        }
    )
})