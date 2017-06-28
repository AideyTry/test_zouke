//将bb跑的匹配数据写入map信息

require('../requireRoot');
require('@local/common/core/w/prototype');
const dbclient = requireRoot('dbclient');
const TaskQueue = require('@local/task-queue');

async function run(){
    const zkHotels = await dbclient.collections.get('zk_hotels');
    const spHotels = await dbclient.collections.get('sp_hotels');

    const zk_ht_map = await dbclient.collections.get('zk_ht_map');


}

run().then(()=>{
    process.exit();
});