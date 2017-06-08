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

        // 旧mapping特殊处理
        if(spHotel.sp_id){
            if(spHotel.sp_id.dl_id){
                addToSet['sp_id.dl_id'] = { $each: spHotel.sp_id.dl_id };
            }
            if(spHotel.sp_id.mk_id){
                addToSet['sp_id.mk_id'] = { $each: spHotel.sp_id.mk_id };
            }
        }

        await zkCollection.updateOne({ _id: zkId }, {
            $addToSet: addToSet
        });
    }
    async insert(hotel, spId){
        const id = await genZkId();
        hotel._id = id;
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