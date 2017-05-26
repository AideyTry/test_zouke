const Mapping = require('./Mapping');
const mongodb = require('mongodb');

module.exports = class VTMapping extends Mapping{
    async $findSpNotResolve(){
        return await super.$findSpNotResolve({
            supplier: 'vt'
        })
        
    }
    async query(){
        return await super.query({
            supplier: 'vt'
        })
    }

    async map(spId, zk_id){
        const spCollection = await this.$getZkHotelCollection();
        const vtHotel = await spCollection.findOne({ _id: new mongodb.ObjectId(spId), supplier: 'vt' })

        if(!vtHotel) return false;

        await this.$map(vtHotek, zk_id);
        return true;
    }

    async $map(vtHotel, zk_id){
        return await super.$map(vtHotel, zk_id, 'vt_ids');
    }

    async $offline(vtHotel){
        return await super.$offline(vtHotel, 'vt_ids');
    }

    async $insert(vtHotel,...arg){
        vtHotel.sp_id = {
            vt_ids: [vtHotel.id]
        };
        return await super.$insert(vtHotel,...arg);
    }
}