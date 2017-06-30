// 将匹配hotel字段写入zk_hotels

require('../requireRoot');
require('@local/common/core/w/prototype');
const dbclient = requireRoot('dbclient');
const TaskQueue = require('@local/task-queue');

async function run(){
    const spHotels = await dbclient.collections.get('sp_hotels');
    const zkHotels = await dbclient.collections.get('zk_hotels');

    const list = await spHotels.distinct('map_state.strict');
    await TaskQueue.run(list, async id=>{
        await zkHotels.updateOne({_id:id}, { $set: { _map: true } });
    });
}

/*
run().then(()=>{
    process.exit();
});
*/