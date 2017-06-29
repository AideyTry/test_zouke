const { getZkHotelCollection, genZkId } = require('./utils');

module.exports = class ZkResolver {
    static get(supplier){
        return new ZkResolver(supplier);
    }
    constructor(sp, mapField = sp+'_id'){
        this.sp = sp;
        this.mapField = mapField;
    }
    async offline(spId){
        const zkCollection = await getZkHotelCollection();
        await zkCollection.findOneAndUpdate({[`sp_id.${this.mapField}`]: spId}, {
            $pull: { [`sp_id.${spResolver.mapField}`]: spId }
        });
    }
    async map(zkId, spHotel, alias){
        const spId = spHotel.id;
        const zkCollection = await getZkHotelCollection();
        
        const addToSet = {
            [`sp_id.${this.mapField}`]: spId,
            "alias":{ $each:alias }
        };

        await zkCollection.updateOne({ _id: zkId }, {
            $addToSet: addToSet,
            $set: { _map: true }
        });
    }
    async insert(hotel, spId){
        const id = await genZkId();
        hotel._id = id;
        hotel._map = true;
        if(!hotel.sp_id){
            hotel.sp_id = {
                [this.mapField]: [spId]
            };
        }
        const zkCollection = await getZkHotelCollection();
        await zkCollection.insertOne(hotel);
        return id;
    }
}