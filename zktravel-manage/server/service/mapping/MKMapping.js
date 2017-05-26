const Mapping = require('./Mapping');

module.exports = class MKMapping extends Mapping{
    async $findSpNotResolve(){
        return await super.$findSpNotResolve({supplier: 'mk'})
    }
    async query(){
        return await super.query({supplier: 'mk'})
    }
    async map(spId, zk_id){
        const spCollection = await this.$getZkHotelCollection();
        const mkHotel = await spCollection.findOne({ _id: new mongodb.ObjectId(spId), supplier: 'mk' })

        if(!mkHotel) return false;

        await this.$map(mkHotek, zk_id);
        return true;
    }
    async $map(mkHotel, zk_id){
        return await super.$map(mkHotel, zk_id, 'mk_ids');
    }

    async $offline(mkHotel){
        return await super.$offline(mkHotel, 'mk_ids');
    }

    async $insert(mkHotel,...arg){
        mkHotel.sp_id = {
            mk_ids: [mkHotel.id]
        };
        return await super.$insert(mkHotel,...arg);
    }
}