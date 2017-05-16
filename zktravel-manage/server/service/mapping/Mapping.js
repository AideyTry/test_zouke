
const dbclient = requireRoot('db');
const MappingLevel = require('./MappingLevel');

module.exports = class Mapping {
    async $db(){
        return await dbclient.get();
    }
    async $genId(){
        return await (await this.$db()).genId('zk_hotels_map_test');
    }
    async $getZkHotelCollection(){
        if(!this._zkCollection){
            const db = await dbclient.get();
            this._zkCollection = await db.collection('zk_hotels_map_test');
        }
        return this._zkCollection;
    }
    async $getSpHotelCollection(){
        if(!this._spCollection){
            const db = await dbclient.get();
            this._spCollection = await db.collection('sp_hotels_map_test');
        }
        return this._spCollection;
    }
    async $findSpNotResolve(query = {}){
        const collection = await this.$getSpHotelCollection();
        return collection.find({
            $and:[
                {
                    'map_state.invalid': { $ne: true },
                    $or:[
                        { 
                            'map_state.strict': null,
                            'mode': { $ne: 'r' }
                        },
                        {
                            'map_state.strict': { $ne:null },
                            'mode': 'd'
                        },
                        { 
                            'map_state.remap': true,
                            'mode': { $ne:'d' }
                        }
                    ],
                    
                },
                query
            ]
        });
    }

    async invalid(sp_id){

    }

    async map(sp_id, zk_id){

    }
    //匹配
    async $map(spHotel, zk_id){

    }


    async insert(sp_id, timestamp){

    }
    //入库
    async $insert(spHotel, logPre='autoMap'){
        // todo: insert

        const doc = Object.assign({}, spHotel);
        delete doc.mode;
        delete doc.map_state;
        
        doc._id = await this.$genId();

        const zkCollection = await this.$getZkHotelCollection();
        await zkCollection.insertOne(doc);

        const spCollection = await this.$getSpHotelCollection();
        const remapResult = await this._searchSimilarHotel(doc,spCollection, {
            'mode': 'r',
            'map_state.fuzzy': { $ne: null }
        });

        for(let remapHotel of remapResult){
            const diffResult = this._diff(remapHotel, doc);
            
            try{
                if(MappingLevel.isHighest(diffResult)){
                    console.log(`${logPre}: insert check remap spHotel:${spHotel._id} -> zkHotel:${remapHotel.hotel._id}`);
                    await this._resolveHotel(remapHotel.hotel._id,{
                        timestamp: new Date().valueOf(),
                        strict: doc._id,
                        key: diffResult,
                        remap: true
                    });
                }else{
                    console.log(`${logPre}: insert check update fuzzy spHotel:${spHotel._id} -> zkHotel:${doc._id}`);
                    await spCollection.updateOne({_id: remapHotel.hotel._id},{
                        $set: { 
                            timestamp: new Date().valueOf(), 
                            [`map_state.fuzzy.${doc._id}`]: diffResult
                        }
                    })
                }
            }catch(e){
                console.error(e);
            }
        }

        return doc._id;
    }

    //下架
    async $offline(spHotel){
    }

    _diff({ dis, hotel: hotel1 }, hotel2){
        let result = 0;
        
        if(
            (hotel1.name&&(hotel1.name===hotel2.name))||
            (hotel1.name_en&&(hotel1.name_en===hotel2.name_en))
        ){
            result |= 0b0000001;
        }
        if( hotel1.phone&&(hotel1.phone===hotel2.phone)){
            result |= 0b0001000;
        }
        if( hotel1.address&&(hotel1.address===hotel2.address)){
            result |= 0b0010000;
        }
        if( hotel1.city&&(hotel1.city===hotel2.city)){
            result |= 0b0100000;
        }
        if( hotel1.url_web&&(hotel1.url_web===hotel2.url_web)){
            result |= 0b1000000;
        }


        if(dis<=50){
            result |= 0b0000110;
        }else if(dis<=500){
            result |= 0b0000100;
        }
        
        return result;
    }

    /*
        // bit:     6    |    5    |    4    |   3   |    2    |   1   |   0 
        // tag:  web_url     city    address   phone    gps500   gps50   hname
        map_state:{
            timestamp: xxxxxx

            strict: zkhotelId
            key: 7,
            *remap: true   //作插入操作时remap

            fuzzy: {
                [_id]: key
            },

            delete: true,

            invalid: true
        }
    */

    async _searchSimilarHotel(hotel, collection, query={}){
        const orQueryCondition = [];
        for(let key of ['name', 'name_en', 'phone', 'address', 'url_web']){
            if(hotel[key]) orQueryCondition.push({ [key]: hotel[key] });
        }

        const queryResults = (await (await this.$db()).command({
            geoNear: collection.s.name,
            near: { type:'Point', coordinates: [hotel.gps.lng, hotel.gps.lat] },
            spherical: true,
            maxDistance: 500,
            query: {
                $and: [
                    {
                        country_id: hotel.country_id,
                        $or: orQueryCondition
                    },
                    query
                ]
            }
        })).results.map(r=>({ dis:r.dis, hotel:r.obj }));

        const cityResults = await collection.find({
            $and: [
                {
                    country_id: hotel.country_id,
                    city: hotel.city,
                    _id: { $nin: queryResults.map(r=>r.hotel._id) },
                    $or: orQueryCondition
                },
                query
            ]
        }).toArray();

        queryResults.push(...cityResults.map(r=>({ dis:1000, hotel:r })));
        return queryResults;
    }

    async _resolveHotel(_id, map_state){
        // 将数据置为已处理
        const spHotelCollection = await this.$getSpHotelCollection();
        await spHotelCollection.updateOne({
            _id: _id,
        }, {
            $set: { map_state, mode: 'r' }
        });
    }

    async autoMap(){
        const cursor = await this.$findSpNotResolve();
        const zkHotelCollection = await this.$getZkHotelCollection();
        const spHotelCollection = await this.$getSpHotelCollection();
        
        let spHotel = null;

        while((spHotel = await cursor.next())){
            let map_state = {
                timestamp: new Date().valueOf()
            };

            if(
                spHotel.mode==='r'&&
                spHotel.map_state&&
                spHotel.map_state.remap&&
                spHotel.map_state.strict){
                // insert 时 remap操作
                map_state.strict = spHotel.map_state.strict;
                map_state.key = spHotel.map_state.key;
                try{
                    console.log(`autoMap: remap spHotel:${spHotel._id} -> zkHotel:${map_state.strict}`);
                    await this.$map(spHotel, map_state.strict);
                    await this._resolveHotel(spHotel._id, map_state);
                }catch(e){
                    console.error(e);
                }
                continue;
            }

            if(spHotel.mode==='d'){
                //delete sp hotel
                map_state.delete = true;
                try{
                    console.log(`autoMap: offline spHotel:${spHotel._id}`);
                    await this.$offline(spHotel);
                    await this._resolveHotel(spHotel._id, map_state);
                }catch(e){
                    console.error(e);
                }
                continue;
            }

            const queryResults = await this._searchSimilarHotel(spHotel, zkHotelCollection);

            if(queryResults.length===0){
                /*
                    * doesn't map
                    * insert as new
                */
                try{
                    console.log(`autoMap: doesn't map, insert as new hotel: spHotel:${spHote._id}`);
                    map_state.strict = await this.$insert(spHotel);
                    map_state.key = 0b1111111;
                    await this._resolveHotel(spHotel._id, map_state);
                }catch(e){
                    console.error(e);
                }
            }else{
                map_state.fuzzy = {};

                for(let zkHotelResult of queryResults){
                    const diffResult = this._diff(zkHotelResult, spHotel);
                    if(MappingLevel.isHighest(diffResult)){
                        //免审
                        delete map_state.fuzzy;
                        map_state.strict = zkHotelResult.hotel._id;
                        map_state.key = diffResult;
                        break;
                    }

                    map_state.fuzzy[zkHotelResult.hotel._id] = diffResult;
                }
                try{
                    if(map_state.strict){
                        console.log(`autoMap: map spHotel:${spHotel._id} -> zkHotel:${map_state.strict}`)
                        await this.$map(spHotel, map_state.strict/*_id*/);
                    }else{
                        console.log(`autoMap: save fuzzy hotels spHotel:${spHotel._id} -> zkHotels:${JSON.stringify(map_state.fuzzy)}`)
                    }
                    await this._resolveHotel(spHotel._id, map_state);
                }catch(e){
                    console.error(e);
                }
            }
        }
    }
}