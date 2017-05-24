const Mapping = require('./Mapping');

module.exports = class DLMapping extends Mapping{
    async $findSpNotResolve(){
        return await super.$findSpNotResolve({supplier: 'dl'})
    }
    async query(){
        return await super.query({supplier: 'dl'})
    }
    async $map(dlHotel, zk_id){
        return await super.$map(dlHotel, zk_id, 'dl_ids');
    }

    async $offline(dlHotel){
        return await super.$offline(dlHotel, 'dl_ids');
    }

    async $insert(dlHotel,...arg){
        dlHotel.sp_id = {
            dl_ids: [dlHotel.id]
        };
        return await super.$insert(dlHotel,...arg);
    }
}