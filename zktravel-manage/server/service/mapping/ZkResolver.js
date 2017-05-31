const { getZkHotelCollection, genZkId } = require('./utils');

module.exports = class ZkResolver {
    static get(supplier){
        return new ZkResolver(supplier);
    }
    constructor(sp, mapField = sp+'_ids'){
        this.sp = sp;
        this.mapField = mapField;
    }
    async offline(spId){
        const zkCollection = await getZkHotelCollection();
        await zkCollection.findOneAndUpdate({[`sp_id.${this.mapField}`]: spId}, {
            $pull: { [`sp_id.${spResolver.mapField}`]: spId }
        });
    }
    async map(zkId, spId, alias){
        const zkCollection = await getZkHotelCollection();
        await zkCollection.updateOne({ _id: zkId }, {
            $addToSet: { 
                [`sp_id.${this.mapField}`]: spId,
                "alias":{ $each:alias }
            }
        });
    }
    async insert(hotel, spId){
        const id = await genZkId();
        hotel._id = id;
        hotel.sp_id = {
            [this.mapField]: [spId]
        };
        const zkCollection = await getZkHotelCollection();
        await zkCollection.insertOne(doc);
        return id;
    }
}