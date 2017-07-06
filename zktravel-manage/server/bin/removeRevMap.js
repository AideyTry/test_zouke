require('../requireRoot');
require('@local/common/core/w/prototype');
const dbclient = requireRoot('dbclient');
const TaskQueue = require('@local/task-queue');


async function run(){
    const zkHotels = await dbclient.collections.get('zk_hotels_product');
    const spHotels = await dbclient.collections.get('sp_hotels_product');

    const ids = await zkHotels.distinct('_id', {src:'vt'});
    
    let i = 0;
    for(let id of ids){
        i += await spHotels.find({ supplier: 'vt', [`map_state.fuzzy.${id}`]:{$ne:null} }, { _id:1 }).count()
        console.log(i);
    }
    console.log(i);
}

run().then(()=>{
    process.exit();
})