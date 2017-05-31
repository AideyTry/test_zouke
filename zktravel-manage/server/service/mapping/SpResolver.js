
const { getSpHotelCollection } = require('./utils');

module.exports = class SpResolver {
    static get(){
        return new SpResolver();
    }
    async updateHotel(_id, sql){
        const spHotelCollection = await getSpHotelCollection();
        
        await spHotelCollection.updateOne({
            _id: _id,
        }, sql);
    }
    async queryHotel(spId, sp){
        const spHotelCollection = await getSpHotelCollection();
        return await spHotelCollection.findOne({
            id: spId,
            supplier: sp
        });
    }
    async resolveHotel(_id, map_state){
        await this.updateHotel(_id, {
            $set: { map_state, mode: 'R' }
        });
    }
}