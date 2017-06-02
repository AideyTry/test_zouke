#!/usr/bin/env node

require('../requireRoot');
require('@local/common/core/w/prototype');

const dbclient = requireRoot('db');


async function run(){
    const db = await dbclient.get();
    
    // copy zk_hotels -> sp_hotels_test
    const zk_hotels_collection = await db.collection('zk_hotels');
    const sp_hotels_test_collection = await db.collection('sp_hotels_test');
    // copy zk_hotels_new -> zk_hotels_test
    const zk_hotels_new_collection = await db.collection('zk_hotels_new');
    const zk_hotels_test_collection = await db.collection('zk_hotels_test');

    await zk_hotels_test_collection.deleteMany({});
    const hotels = await zk_hotels_new_collection.find({}).toArray();
    await zk_hotels_test_collection.insertMany(hotels.map(hotel=>{
        hotel.status = 0;
        hotel.geo = [hotel.gps.lng, hotel.gps.lat];
        return hotel;
    }));

    await sp_hotels_test_collection.deleteMany({});
    const zkHotels = await zk_hotels_collection.find({ city_id: hotels[0].city_id }, { 
        name:1, name_en:1, country_id:1, address:1, city_name:1, country_name:1, city_id:1, gps:1, url_web:1,
        phone:1, star:1
    }).toArray();
    await sp_hotels_test_collection.insertMany(zkHotels.map(hotel=>{
        hotel.id = hotel._id;
        delete hotel._id;
        hotel.mode = "I";
        hotel.supplier = "vt";
        hotel.geo = [hotel.gps.lng, hotel.gps.lat];
        return hotel;
    }));

    process.exit();
}


run();