const SpResolver = require('./SpResolver');
const ZkResolver = require('./ZkResolver');

const { diff, getSpHotelCollection, getZkHotelCollection, getDb } = require('./utils');
const MapState = require('./MapState');
const Pretreatment = require('./Pretreatment');
const MappingLevel = require('./MappingLevel');

module.exports = class Mapping {

    constructor(){
        this._stat = {
            alone: 0,
            map: 0,
            fuzzy: 0,
            offline: 0
        }
    }

    $logInc(type){
        if(type in this._stat) ++this._stat[type];
    }

    async $findSpNotResolve(){
        const collection = await getSpHotelCollection();
        return collection.find({
            [`${Pretreatment.field}._v`]: Pretreatment.version,
            //'status': 0,
            'map_state.invalid': null,
            'map_state.strict': null,
            'map_state.offline':null
        });
    }
    //相似酒店
    async $searchSimilarHotel(hotel, collection, query={}){
        const orQueryCondition = [];
        for(let key of ['name', 'name_en', 'phone', 'address', 'url_web']){
            if(hotel[Pretreatment.field][key]) 
                orQueryCondition.push({ [`${Pretreatment.field}.${key}`]: hotel[Pretreatment.field][key] });
        }

        const queryResults = (await (await getDb()).command({
            geoNear: collection.s.name,
            near: { type:'Point', coordinates: hotel.geo },
            spherical: true,
            maxDistance: 1001,
            query: {
                $and: [
                    {
                        //country_id: hotel.country_id,
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
                        //country_id: hotel.country_id,
                        city_id: hotel.city_id,
                        _id: { $nin: queryResults.map(r=>r.hotel._id) },
                        $or: orQueryCondition
                    },
                    query
                ]
            }).toArray();
            queryResults.push(...cityResults.map(r=>({ dis:1001, hotel:r })));
        }

        return queryResults;
    }

    // 下架
    async $offline(spHotel){
        const spResolver = SpResolver.get(spHotel.supplier);
        if(MapState.isStrict(spHotel.map_state)){
            const zkResolver = ZkResolver.get(spHotel.supplier);
            
            await zkResolver.offline(spHotel.id);
        }
        await spResolver.resolveHotel(spHotel._id, MapState.createOffline());
    }
    async $map(spHotel, zkId, map_key){
        const alias = [];
        if(spHotel.name) alias.push(spHotel.name);
        if(spHotel.name_en) alias.push(spHotel.name_en);

        await ZkResolver.get(spHotel.supplier).map(zkId, spHotel.id, alias);
        await SpResolver.get(spHotel.supplier).resolveHotel(spHotel._id, MapState.createStrict(zkId, map_key));
    }
    async $fuzzy(spHotel, fuzzy){
        await SpResolver.get(spHotel.supplier).resolveHotel(spHotel._id, MapState.createFuzzy(fuzzy, spHotel.map_state));
    }
    async $alone(spHotel){
        if(!spHotel.map_state){
            await SpResolver.get(spHotel.supplier).resolveHotel(spHotel._id, MapState.createAlone());
        }
    }

    async $insert(spHotel){
        const spResolver = SpResolver.get(spHotel.supplier);
        const zkResolver = ZkResolver.get(spHotel.supplier);

        const zkHotel = Object.assign({}, spHotel);
        delete zkHotel.mode;
        delete zkHotel.map_state;
        zkHotel.supplier_from = zkHotel.supplier;
        zkHotel.status = 1;
        delete zkHotel.supplier;
        delete zkHotel.id;
        // 插入sai酒店库
        const zkId = await zkResolver.insert(zkHotel, spHotel.id);
        // 更新sp酒店库匹配信息
        spResolver.resolveHotel(spHotel._id, MapState.createStrict(zkId, -1));

        const spCollection = await getSpHotelCollection();
        // 用新插入的酒店反查sp酒店库去重
        const remapResult = await this.$searchSimilarHotel(zkHotel, spCollection, {
            _id: { $ne: spHotel._id },
            'map_state':{ $ne: null },
            'map_state.invalid': null,
            'map_state.strict': null,
            'map_state.offline':null
        });

        for(let remapHotel of remapResult){
            const diffResult = diff(remapHotel, zkHotel);
            
            try{
                if(MappingLevel.isHighest(diffResult)){
                    //返查自动匹配
                    await this.$map(remapHotel.hotel, zkId, diffResult);
                }else{
                    //返查更新fuzzy信息
                    await this.$fuzzy(remapHotel.hotel, {[zkId]: diffResult});
                }
            }catch(e){
                console.error(e);
            }
        }
    }

    async query(sp, level){
        const spCollection = await getSpHotelCollection();
        const zkCollection = await getZkHotelCollection();
        const spQuery = {
            'supplier': sp,
            'map_state.invalid': {$ne:true}
        };
        if(level==='alone'){
            spQuery['map_state.alone'] = true;
        }else{
            spQuery['map_state.fuzzy'] = { $ne:null };
            if(level){ 
                spQuery['map_state.fuzzy_level'] = level;
            }
        }
        const spFuzzyList = await spCollection.find(spQuery,
            { id:1, name:1, name_en:1, address:1, phone:1, url_web:1, map_state:1, gps: 1 }).toArray();

        const zkIds = new Set();

        for(let {map_state:{fuzzy}} of spFuzzyList.filter(sp=>!!sp.map_state.fuzzy)){
            const keys = Object.keys(fuzzy);
            for(let id of keys){
                if(!level){
                    zkIds.add(parseInt(id));
                }else{
                    if(level&&MappingLevel.getLevel(fuzzy[id])===level){
                        zkIds.add(parseInt(id));
                    }else{
                        delete fuzzy[id];
                    }
                }
            }
        }

        const zkHotels = await zkCollection.find({
            _id: {$in:[...zkIds]}
        }, { name:1, name_en:1, address:1, phone:1, url_web:1, gps:1, url:1 }).toArray();
        
        const zkHotelMap = {};
        for(let zkHotel of zkHotels){
            zkHotelMap[zkHotel._id] = zkHotel;
        }

        const result = [];
        
        for(let sp of spFuzzyList){
            const map_state = sp.map_state;
            if(map_state.alone){
                result.push({
                    sign: map_state.timestamp,
                    sp: sp.supplier,
                    spId: sp.id,
                    spName: sp.name,
                    spNameEn: sp.name_en,
                    spAddress: sp.address,
                    spPhone: sp.phone,
                    spWeb: sp.url_web,
                    spGPS: sp.gps,
                })
                continue;
            }

            for(let zkId of Object.keys(map_state.fuzzy)){
                const zk = zkHotelMap[zkId];
                const key = map_state.fuzzy[zkId];
                result.push({
                    sign: map_state.timestamp,
                    sp: sp.supplier,
                    spId: sp.id,
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

                    bookingUrl: zk.url,

                    level: MappingLevel.getLevel(key),
                    levelRank: MappingLevel.getLevelRank(key)
                })
            }
        }
        return result;
    }

    async invalid(spId, sp){
        const spResolver = SpResolver.get(sp);
        const spHotel = await spResolver.queryHotel(spId, sp);
        if(MapState.isFuzzy(spHotel.map_state)){
            await spResolver.resolveHotel(spHotel._id, MapState.createInvalid());
            return 0;
        }
        return 1; //状态已变更（非fuzzy状态）
    }

    async map(zkId, spId, sp){
        const spResolver = SpResolver.get(sp);
        const spHotel = await spResolver.queryHotel(spId, sp);

        if(!spHotel) return 1; //hotel not found

        if(MapState.isFuzzy(spHotel.map_state)){
            console.log(`${sp} hotel map manual: spId|${spId} === zkId|${zkId}`);
            await this.$map(spHotel, zkId, spHotel.map_state.fuzzy[zkId]);
            return 0;
        }
        return 2; //状态已变更（非fuzzy状态）
    }

    async insert(spId, sp, timestamp){
        const spResolver = SpResolver.get(sp);
        const spHotel = await spResolver.queryHotel(spId, sp);
        
        if(!spHotel) return 1; //hotel not found

        if(!MapState.isFuzzy(spHotel.map_state)){
            return 2;  //状态已变更（非fuzzy状态）
        }
        if(timestamp && spHotel.map_state.timestamp!==timestamp){
            return 3; //fuzzy信息变更
        }

        console.log(`${sp} hotel insert as new sai hotel: spId|${spId}`);
        await this.$insert(spHotel);
        return 0;
    }

    async autoMap(){
        const hotelCursor = await  this.$findSpNotResolve();
        const zkHotelCollection = await getZkHotelCollection();

        const count = await hotelCursor.count();
        let updateCount = 0;
        if(count===0) return;

        return new Promise(resolve=>{
            const end = ()=>{
                ++updateCount;
                if(updateCount>=count){
                    console.log('autoMap stat: ', this._stat);
                    resolve();
                }
            };
            
            hotelCursor.forEach(async spHotel=>{
                if(spHotel.mode==='D'){
                    // offline sp hotel
                    try{
                        this.$logInc('offline');
                        console.log(`autoMap: offline ${spHotel.supplier} hotel -> spId|${spHotel.id}`)
                        await this.$offline(spHotel);
                    }catch(e){
                        console.error(e);
                    }
                    return end();
                }

                const similarZkHotels = await this.$searchSimilarHotel(spHotel, zkHotelCollection);
                if(similarZkHotels.length===0){
                    /*
                    * doesn't map
                    * insert as new
                    */
                    try{
                        this.$logInc('alone');
                        console.log(`autoMap: ${spHotel.supplier} hotel not map any sai hotel -> spId|${spHotel.id}`);
                        this.$alone(spHotel);
                        //await this.$insert(spHotel);
                    }catch(e){
                        console.log(e);
                    }
                    return end();
                }


                const fuzzy = {};

                for(let zkHotelResult of similarZkHotels){
                    const diffResult = diff(zkHotelResult, spHotel);
                    if(MappingLevel.isHighest(diffResult)){
                        //免审
                        this.$logInc('map');
                        console.log(`autoMap: ${spHotel.supplier} hotel auto map sai hotel -> spId|${spHotel.id} == zkId|${zkHotelResult.hotel._id}`);
                        try{
                            await this.$map(spHotel, zkHotelResult.hotel._id, diffResult);
                        }catch(e){
                            console.error(e);
                        }
                        return end();
                    }
                    fuzzy[zkHotelResult.hotel._id] = diffResult;
                }

                this.$logInc('fuzzy');
                console.log(`autoMap: ${spHotel.supplier} hotel fuzzy map sai hotel -> spId|${spHotel.id}`);
                try{
                    await this.$fuzzy(spHotel, fuzzy);
                }catch(e){
                    console.error(e);
                }
                return end();
            });
        });
    }
}