require('../requireRoot');
require('@local/common/core/w/prototype');
const dbclient = requireRoot('dbclient');

async function run(){
    const collection = await dbclient.collections.get('zkmanager_user');
    await collection.insertMany([
        { _id:3225583, role:['admin','room-booking'], p: {offline_order : 154008|10432 }, role_name:'管理员', name:'VIP专员' },
        { _id:360755, role:['admin','room-booking'], p: {offline_order : 154008|10432 }, role_name:'管理员', name:'多多' },

        { _id:364551, role:'custom-service', p: {offline_order : 119303 }, role_name:'客服', name:'July' },
        { _id:3226287, role:'custom-service', p: {offline_order : 119303 }, role_name:'客服', name:'Sky' },
        { _id:364052, role:'custom-service', p: {offline_order : 119303 }, role_name:'客服', name:'Cherry' },

        { _id:361333, role:'room-booking', p: {offline_order : 10432 }, role_name:'订房员', name:'辛凯' },
        { _id:3226096, role:'room-booking', p: {offline_order : 10432 }, role_name:'订房员', name:'吴迪' },
        { _id:387498, role:'room-booking', p: {offline_order : 10432 }, role_name:'订房员', name:'刘慧君' },
        { _id:360905, role:'room-booking', p: {offline_order : 10432 }, role_name:'订房员', name:'谭然' },
        { _id:3226012, role:'room-booking', p: {offline_order : 10432 }, role_name:'订房员', name:'闻慧' },
        { _id:3225913, role:'room-booking', p: {offline_order : 10432 }, role_name:'订房员', name:'贾蕊瑜' },
        { _id:3225953, role:'room-booking', p: {offline_order : 10432 }, role_name:'订房员', name:'吴瑶' },
        { _id:360676, role:'room-booking', p: {offline_order : 10432 }, role_name:'订房员', name:'郑艳' },
    ])
}



run().then(()=>{
    process.exit();
});
