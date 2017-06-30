const dbclient = requireRoot('dbclient');
const mongodb = require('mongodb');

module.exports = class SpHotel {
    async detail(id, type){

        const query = typeof id === 'string' /* _id */? {
            _id: new mongodb.ObjectId(id)
        }:{
            id,
            supplier: type
        }
        const spCollection = await dbclient.collections.get('sp_hotels');

        const detail = await spCollection.findOne(query);
        
        if(detail) delete detail._id;
        return detail;
    }
}