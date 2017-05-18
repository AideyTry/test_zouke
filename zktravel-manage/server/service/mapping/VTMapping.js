const Mapping = require('./Mapping');

module.exports = class VTMapping extends Mapping{
    async $findSpNotResolve(){
        return await super.$findSpNotResolve({
            $or: [ { sp: null }, { sp: 'vt' } ] //default sp: vt
        })
        
    }
    async $map(vtHotel, zk_id){
        const zkCollection = await this.$getZkHotelCollection();
        zkCollection.updateOne({ _id: zk_id }, {
            $addToSet: { 'sp_id.vt_ids': vtHotel.id }
        })
        return await super.$map(vtHotel, zk_id);
    }

    async $offline(vtHotel){
        const zkCollection = await this.$getZkHotelCollection();
        await zkCollection.findOneAndUpdate({'sp_id.vt_ids': vtHotel.id}, {
            $pull: { 'sp_id.vt_ids': vtHotel.id }
        });
        return await super.$offline(vtHotel);
    }

    async $insert(vtHotel,...arg){
        vtHotel.sp_id = {
            vt_ids: [vtHotel.id]
        };
        return await super.$insert(vtHotel,...arg);
    }
}