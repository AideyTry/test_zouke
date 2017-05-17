const Mapping = require('./Mapping');

module.exports = class MKMapping extends Mapping{
    async $findSpNotResolve(){
        return await super.$findSpNotResolve({sp: 'mk'})
    }
    async $map(mkHotel, zk_id){
        const zkCollection = await this.$getZkHotelCollection();
        zkCollection.updateOne({ _id: zk_id }, {
            $addToSet: { 'sp_id.mk_ids': mkHotel.id }
        });
        return await super.$map(mkHotel, zk_id);
    }

    async $offline(mkHotel){
        const zkCollection = await this.$getZkHotelCollection();
        await zkCollection.findOneAndUpdate({'sp_id.mk_ids': mkHotel.id}, {
            $pull: { 'sp_id.mk_ids': mkHotel.id }
        });
        return await super.$offline(mkHotel);
    }

    async $insert(mkHotel,...arg){
        mkHotel.sp_id = {
            mk_ids: [mkHotel.id]
        };
        return await super.$insert(mkHotel,...arg);
    }
}