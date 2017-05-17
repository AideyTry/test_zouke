#!/usr/bin/env node

require('../requireRoot');
require('@local/common/core/w/prototype');

const dbclient = requireRoot('db');
const { zk_collection_name } = requireRoot('service/mapping/config');
const Pretreatment = requireRoot('service/mapping/Pretreatment');

async function run(){
    const db = await dbclient.get()
    const zkCollection = await db.collection(zk_collection_name);

    const cursor =  zkCollection.find(
        { [`${Pretreatment.field}._v`]: { $ne: Pretreatment.version } },
        { name: 1, name_en: 1, phone: 1, url_web: 1, address: 1 }
    );

    const count = await cursor.count();
    let updateCount = 0;

    cursor.forEach(async hotel=>{
        await zkCollection.updateOne({_id: hotel._id},{
            $set:{ [Pretreatment.field]: Pretreatment.convert(hotel) }
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