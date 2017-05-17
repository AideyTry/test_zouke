#!/usr/bin/env node

require('../requireRoot');
require('@local/common/core/w/prototype');

const dbclient = requireRoot('db');
const { sp_collection_name } = requireRoot('service/mapping/config');

async function run(){
    const db = await dbclient.get()
    const spCollection = await db.collection(sp_collection_name);

    const cursor =  spCollection.find({},{zk_info:1});

    const count = await cursor.count();
    let updateCount = 0;

    cursor.forEach(async hotel=>{
        await spCollection.updateOne({_id: hotel._id},{
            $set:hotel.zk_info
        });
        ++updateCount;
        if(updateCount%10000 === 0){
            console.log(updateCount);
        }
        if(updateCount>=count){
            console.log(count);
            process.exit();
        }
    });
}

run();