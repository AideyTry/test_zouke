
const dbclient = requireRoot('db');
const MappingLevel = require('./MappingLevel');
const { zk_collection_name, sp_collection_name } = require('../config');
const Pretreatment = require('./Pretreatment');
const mongodb = require('mongodb');

function abstractError(){
    throw new Error('this method need to rewrite by child class')
}

module.exports = class Mapping {

    constructor(){
        this._state = {
            offline: 0,
            map: 0,
            remap: 0,
            need_remap: 0,
            insert: 0
        }
    }

    _incState(type){
        if(type in this._state){
             ++this._state[type];
        }
    }

    logState(){
        console.log(JSON.stringify(this._state));
    }

    async $db(){
        return await dbclient.get();
    }
    async $genId(){
        return await (await this.$db()).genId(zk_collection_name);
    }
    async $getZkHotelCollection(){
        if(!this._zkCollection){
            const db = await dbclient.get();
            this._zkCollection = await db.collection(zk_collection_name);
        }
        return this._zkCollection;
    }
    async $getSpHotelCollection(){
        if(!this._spCollection){
            const db = await dbclient.get();
            this._spCollection = await db.collection(sp_collection_name);
        }
        return this._spCollection;
    }
    async $findSpNotResolve(query = {}){
        const collection = await this.$getSpHotelCollection();
        return collection.find({
            $and:[
                {
                    [`${Pretreatment.field}._v`]: Pretreatment.version,
                    'map_state.invalid': { $ne: true },
                    'country_id': { $nin:[null, ''] },
                    $or:[
                        {
                            'map_state.strict': null,
                            'mode': { $ne: 'R' }
                        },
                        {
                            'map_state.strict': { $ne:null },
                            'mode': 'D'
                        },
                        { 
                            'map_state.remap': true,
                            'mode': { $ne:'D' }
                        }
                    ],
                    
                },
                query
            ]
        });
    }

    async query(query){
        const spCollection = await this.$getSpHotelCollection();
        const zkCollection = await this.$getZkHotelCollection();
        const spFuzzyList = await spCollection.find({
            $and:[
                {
                    'map_state.invalid': {$ne:true},
                    'map_state.fuzzy': {$ne:null},
                    'mode': 'R'
                },
                query
            ]
        }, { id:1, name:1, name_en:1, address:1, phone:1, url_web:1, map_state:1, gps: 1 }).toArray();

        const zkIds = new Set();

        for(let {map_state:{fuzzy}} of spFuzzyList){
            const keys = Object.keys(fuzzy);
            for(let id of keys){
                zkIds.add(parseInt(id));
            }
        }

        const zkHotels = await zkCollection.find({
            _id: {$in:[...zkIds]}
        }, { name:1, name_en:1, address:1, phone:1, url_web:1, gps:1, booking_info:1 }).toArray();

        const zkHotelMap = {};
        for(let zkHotel of zkHotels){
            zkHotelMap[zkHotel._id] = zkHotel;
        }

        const result = [];
        
        for(let sp of spFuzzyList){
            const map_state = sp.map_state;
            for(let zkId of Object.keys(map_state.fuzzy)){
                const zk = zkHotelMap[zkId];
                const key = map_state.fuzzy[zkId];
                result.push({
                    sign: map_state.timestamp,
                    spId: sp._id.toString(),
                    spName: sp.name,
                    spNameEn: sp.name_en,
                    spAddress: sp.address,
                    spPhone: sp.phone,
                    spWeb: sp.url_web,
                    spGPS: sp.gps,
                    
                    zkId: zk._id,
                    zkName: zk.name,
                    zkNameEn: zk.name_en,
                    zkAddress: zk.address,
                    zkPhone: zk.phone,
                    zkWeb: zk.url_web,
                    zkGPS: zk.gps,

                    bookingUrl: zk.booking_info?zk.booking_info.url:'',

                    level: MappingLevel.getLevel(key),
                    levelDesc: MappingLevel.getLevelDesc(key)
                })
            }
        }

        return result;
    }

    async invalid(_spId){
        const spCollection = await this.$getSpHotelCollection();
        await this._resolveHotel(_spId, {
            timestamp: new Date().valueOf(),
            invalid: true
        })
    }

    async map(_spId, zk_id){
        _spId = new mongodb.ObjectId(_spId);
        const spCollection = await this.$getSpHotelCollection();
        const spHotel = await spCollection.findOne({ _id: _spId})

        if(!spHotel) return false;

        await this.$map(spHotel, zk_id);

        await this._resolveHotel(_spId, {
            timestamp: new Date().valueOf(),
            strict: zk_id,
            key: spHotel.map_state.fuzzy[zk_id]
        });

        return true;
    }

    //匹配
    async $map(spHotel, zk_id, sp_area = abstractError()){
        if(spHotel.map_state&&spHotel.map_state.remap){
            this._incState('remap');
        }else{
            this._incState('map');
        }
        const alias = [];
        if(spHotel.name) alias.push(spHotel.name);
        if(spHotel.name_en) alias.push(spHotel.name_en);

        const zkCollection = await this.$getZkHotelCollection();
        zkCollection.updateOne({ _id: zk_id }, {
            $addToSet: { 
                [`sp_id.${sp_area}`]: spHotel.id,
                "alias":{ $each:alias }
            }
        });
    }


    async insert(_spId, timestamp){
        _spId = new mongodb.ObjectId(_spId);
        const spCollection = await this.$getZkHotelCollection();
        const spHotel = await spCollection.findOne({ _id: _spId });
        if(!spHotel) return 1; //hotel not found
        if(!spHotel.map_state||!spHotel.map_state.timestamp) return 2; //no map info;

        if(timestamp!==0&&spHotel.map_state.timestamp!==timestamp) return 3; //timestamp changed

        const _id = await this.$insert(spHotel, 'clientInsert');
        await this._resolveHotel(_spId, {
            timestamp: new Date().valueOf(),
            strict: _id,
            key: 0b1111111
        });
        return 0;
    }
    //入库
    async $insert(spHotel, logPre='autoMap'){
        this._incState('insert');

        const doc = Object.assign({}, spHotel);
        delete doc.mode;
        delete doc.map_state;
        
        doc._id = await this.$genId();

        const zkCollection = await this.$getZkHotelCollection();
        await zkCollection.insertOne(doc);

        const spCollection = await this.$getSpHotelCollection();
        const remapResult = await this._searchSimilarHotel(doc, spCollection, {
            'mode': 'R',
            _id: { $ne: spHotel._id },
            'map_state.fuzzy': { $ne: null }
        });

        for(let remapHotel of remapResult){
            const diffResult = this._diff(remapHotel, doc);
            
            try{
                if(MappingLevel.isHighest(diffResult)){
                    console.log(`${logPre}: insert check remap spHotel:${remapHotel.hotel.id} -> zkHotel:${doc._id}`);
                    await this._resolveHotel(remapHotel.hotel._id,{
                        timestamp: new Date().valueOf(),
                        strict: doc._id,
                        key: diffResult,
                        remap: true
                    });
                    this._incState('need_remap');
                }else{
                    console.log(`${logPre}: insert check update fuzzy spHotel:${remapHotel.hotel.id} -> zkHotel:${doc._id}`);
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
    async $offline(spHotel, sp_area = abstractError()){
        this._incState('offline');

        const zkCollection = await this.$getZkHotelCollection();
        await zkCollection.findOneAndUpdate({[`sp_id.${sp_area}`]: spHotel.id}, {
            $pull: { [`sp_id.${sp_area}`]: spHotel.id }
        });
    }

    _diff({ dis, hotel: {[Pretreatment.field]: h1_field} }, { [Pretreatment.field]: h2_field}){
        let result = 0;
        
        if(
            (h1_field.name&&(h1_field.name===h2_field.name))||
            (h1_field.name_en&&(h1_field.name_en===h2_field.name_en))
        ){
            result |= 0b0000001;
        }
        if( h1_field.phone&&(h1_field.phone===h2_field.phone)){
            result |= 0b0001000;
        }
        if( h1_field.address&&(h1_field.address===h2_field.address)){
            result |= 0b0010000;
        }
        if( h1_field.destination_id&&(h1_field.destination_id===h2_field.destination_id)){
            result |= 0b0100000;
        }
        if( h1_field.url_web&&(h1_field.url_web===h2_field.url_web)){
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
            if(hotel[key]) orQueryCondition.push({ [`${Pretreatment.field}.${key}`]: hotel[key] });
        }

        const queryResults = (await (await this.$db()).command({
            geoNear: collection.s.name,
            near: { type:'Point', coordinates: [hotel.gps.lng, hotel.gps.lat] },
            spherical: true,
            maxDistance: 500,
            query: {
                $and: [
                    {
                        //todo
                        country_id: hotel.country_id,
                        $or: orQueryCondition
                    },
                    query
                ]
            }
        })).results.map(r=>({ dis:r.dis, hotel:r.obj }));

        if(hotel.city_id){
            const cityResults = await collection.find({
                $and: [
                    {
                        //todo
                        country_id: hotel.country_id,
                        city_id: hotel.city_id,
                        _id: { $nin: queryResults.map(r=>r.hotel._id) },
                        $or: orQueryCondition
                    },
                    query
                ]
            }).toArray();
            queryResults.push(...cityResults.map(r=>({ dis:1000, hotel:r })));
        }

        return queryResults;
    }

    async _resolveHotel(_id, map_state){
        // 将数据置为已处理
        const spHotelCollection = await this.$getSpHotelCollection();
        
        await spHotelCollection.updateOne({
            _id: _id,
        }, {
            $set: { map_state, mode: 'R' }
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
                spHotel.mode==='R'&&
                spHotel.map_state&&
                spHotel.map_state.remap&&
                spHotel.map_state.strict){
                // insert 时 remap操作
                map_state.strict = spHotel.map_state.strict;
                map_state.key = spHotel.map_state.key;
                try{
                    console.log(`autoMap: remap spHotel:${spHotel.id} -> zkHotel:${map_state.strict}`);
                    await this.$map(spHotel, map_state.strict);
                    await this._resolveHotel(spHotel._id, map_state);
                }catch(e){
                    console.error(e);
                }
                continue;
            }

            if(spHotel.mode==='D'){
                //delete sp hotel
                map_state.delete = true;
                try{
                    console.log(`autoMap: offline spHotel:${spHotel.id}`);
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
                    console.log(`autoMap: doesn't map, insert as new hotel: spHotel:${spHotel.id}`);
                    map_state.strict = await this.$insert(spHotel);
                    map_state.key = 0b1111111;
                    await this._resolveHotel(spHotel._id, map_state);
                }catch(e){
                    console.error(e);
                }
                continue;
            }

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
                    console.log(`autoMap: map spHotel:${spHotel.id} -> zkHotel:${map_state.strict}`)
                    await this.$map(spHotel, map_state.strict/*_id*/);
                }else{
                    console.log(`autoMap: save fuzzy hotels spHotel:${spHotel.id} -> zkHotels:${JSON.stringify(map_state.fuzzy)}`)
                }
                await this._resolveHotel(spHotel._id, map_state);
            }catch(e){
                console.error(e);
            }
        }

        this.logState();
    }
}