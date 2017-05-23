const dbclient = requireRoot('db');
const { zk_collection_name } = requireRoot('service/config');

module.exports = class ZkHotel {
    async detail(id){
        const db = await dbclient.get();
        const spCollection = await db.collection(zk_collection_name);

        return await spCollection.findOne(
            {_id: id}, 
            {
                fields:{
                    map_pretreatment_field: 0,
                    _id: 0,
                    record_time: 0,
                    modify_time: 0,
                    sp_id: 0,
                    booking_info: 0,
                    vt_info: 0,
                    destination_id_vt: 0
                }
            }
        )
    }
}