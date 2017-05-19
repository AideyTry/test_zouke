const Mapping = require('./Mapping');

module.exports = class VTMapping extends Mapping{
    async $findSpNotResolve(){
        return await super.$findSpNotResolve({
            $or: [ { sp: null }, { sp: 'vt' } ] //default sp: vt
        })
        
    }
    async $map(vtHotel, zk_id){
        return await super.$map(vtHotel, zk_id, 'vt_ids');
    }

    async $offline(vtHotel){
        return await super.$offline(vtHotel, 'vt_ids');
    }

    async $insert(vtHotel,...arg){
        vtHotel.sp_id = {
            vt_ids: [vtHotel.id]
        };
        return await super.$insert(vtHotel,...arg);
    }
}