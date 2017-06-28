//将bb跑的匹配数据写入map信息

require('../requireRoot');
require('@local/common/core/w/prototype');
const dbclient = requireRoot('dbclient');
const TaskQueue = require('@local/task-queue');

async function remap(from, sp, bk_id, sp_id, zkHotels, spHotels){
    const spHotel = await spHotels.findOne({ 'supplier':sp, id: sp_id }, {map_state:1});
    if(!spHotel){
        console.log(`spHotel not found: ${sp}|${sp_id}`);
        return 1;
    }

    const { map_state } = spHotel;
    
    if(!map_state||!map_state.strict){
        const zkHotel = await zkHotels.findOne({'sp_id.bk_id': bk_id}, { _id:1 });
        if(!zkHotel){
            console.log(`zkHotel not found: bk_id -> ${bk_id}`);
            return 3;
        }

        console.log(`map`);
        const { _id: zk_id } = zkHotel;

        await zkHotels.updateOne({'_id': zk_id}, { $addToSet: { [`sp_id.${sp}_id`]: sp_id } });
        await spHotels.updateOne({'_id': spHotel._id }, { 
            $set: {
                map_state: {
                    timestamp: new Date().valueOf(),
                    strict: zk_id,
                    map_key:-1,
                    from
                }
            } 
        });
        

        return 4;
    }

    if(map_state.from===from){
        // already map
        console.log('map');
        return 4;
    }

    // already map from other channel
    return 2;
}

function writeStat(stat, result){
    switch(result){
        case 1:
            ++stat['sp not found'];
            break;
        case 2:
            ++stat['already map'];
            break;
        case 3:
            ++stat['zk not found'];
            break;
        case 4:
        default:
            ++stat['remap'];
            break;
    }
}

module.exports = async function run(from){
    const zkHotels = await dbclient.collections.get('zk_hotels');
    const spHotels = await dbclient.collections.get('sp_hotels');

    const zk_ht_map = await dbclient.collections.get(`zk_ht_map_${from}`);
    const vtStat = { 'sp not found': 0, 'zk not found': 0, 'already map': 0, 'remap': 0};
    const dlStat = Object.assign({}, vtStat);

    await TaskQueue.run(zk_ht_map.find({}), async map=>{
        if(map.vt_id){
            const result = await remap(from, 'vt', map.bk_id, map.vt_id, zkHotels, spHotels);
            writeStat(vtStat, result);
        }

        if(map.dl_id){
            const result = await remap(from, 'dl', map.bk_id, map.dl_id, zkHotels, spHotels);
            writeStat(dlStat, result);
        }
    });

    console.log('vtStat: ', vtStat);
    console.log('dlStat: ', dlStat);
}