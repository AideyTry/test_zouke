const Mapping = require('./Mapping');

module.exports = class MKMapping extends Mapping{
    async $findSpNotResolve(){
        return await super.$findSpNotResolve({supplier: 'mk'})
    }
    async query(){
        return await super.query({supplier: 'mk'})
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