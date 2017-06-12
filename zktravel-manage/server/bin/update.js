#!/usr/bin/env node
/*
require('../requireRoot');
require('@local/common/core/w/prototype');

const TaskQueue = require('@local/task-queue');
const DB = requireRoot('db/DB');

async function run(){
    const localDB = (await DB.use('mongodb://admin:admin123@192.168.9.200:37100/admin')).db('booking');
    const testDB = await DB.use('mongodb://zouke:zouke123@115.29.188.30:37100/zouke');
    const booking_parse_info_collection = await localDB.collection('bk_parse_info');
    const zk_hotels_bk = await testDB.collection('zk_hotels_bk');

    await TaskQueue.run(
        zk_hotels_bk.find({}, { _id: 1, sp_id:1 }),
        async ({_id, sp_id})=>{
            const bkInfo = await booking_parse_info_collection.findOne({ _id: sp_id.bk_id[0] }, { _id: 1, address_en:1, phone:1 });
            if(!bkInfo) return;

            if(!bkInfo.address_en&&!bkInfo.phone) return;

            const update = { $set:{ } };
            if(bkInfo.address_en) update.$set.address = bkInfo.address_en;
            if(bkInfo.phone) update.$set.phone = bkInfo.phone;

            console.log('zk_hotel_id: ', _id);

            await zk_hotels_bk.updateOne({ _id }, update);
        }, 
        8
    );
    localDB.close();
    testDB.close();
}

run().catch(e=>{
    console.error(e);
})
*/