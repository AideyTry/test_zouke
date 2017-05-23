const dbclient = requireRoot('db');
const mongodb = require('mongodb');
const { sp_collection_name } = requireRoot('service/config');

module.exports = class SpHotel {
    async detail(id){
        const db = await dbclient.get();
        const spCollection = await db.collection(sp_collection_name);

        return await spCollection.findOne(
            {_id: new mongodb.ObjectId(id)}, 
            {
                fields: {
                    map_pretreatment_field: 0,
                    _id: 0,
                    modify_time: 0,
                    record_time: 0,
                    mode: 0,
                    id: 0,
                    status: 0
                }
            }
        )
    }
}