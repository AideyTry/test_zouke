const Mapping = require('./Mapping');

module.exports = class DLMapping extends Mapping{
    async $findSpNotResolve(){
        return await super.$findSpNotResolve({sp: 'dl'})
    }
    async $map(dlHotel, zk_id){
        const zkCollection = await this.$getZkHotelCollection();
        zkCollection.updateOne({ _id: zk_id }, {
            $addToSet: { 'sp_id.dl_ids': dlHotel.id }
        });
        return await super.$map(dlHotel, zk_id);
    }

    async $offline(dlHotel){
        const zkCollection = await this.$getZkHotelCollection();
        await zkCollection.findOneAndUpdate({'sp_id.dl_ids': dlHotel.id}, {
            $pull: { 'sp_id.dl_ids': dlHotel.id }
        });
        return await super.$offline(dlHotel);
    }

    async $insert(dlHotel,...arg){
        dlHotel.sp_id = {
            dl_ids: [dlHotel.id]
        };
        return await super.$insert(dlHotel,...arg);
    }
}