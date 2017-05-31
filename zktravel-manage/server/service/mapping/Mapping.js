const SpResolver = require('./SpResolver');
const ZkResolver = require('./ZkResolver');

const { diff, getSpHotelCollection, getZkHotelCollection } = require('./utils');
const MapState = require('./MapState');
const Pretreatment = require('./Pretreatment');

module.exports = class Mapping {

    async $findSpNotResolve(){
        const collection = await getSpHotelCollection();
        return collection.find({
            [`${Pretreatment.field}._v`]: Pretreatment.version,
            'status': 0,
            'mode': { $ne: 'R' },
            'map_state.invalid': { $ne: true }
        });
    }
    //相似酒店
    async $searchSimilarHotel(hotel, collection, query={}){
        const orQueryCondition = [];
        for(let key of ['name', 'name_en', 'phone', 'address', 'url_web']){
            if(hotel[Pretreatment.field][key]) 
                orQueryCondition.push({ [`${Pretreatment.field}.${key}`]: hotel[Pretreatment.field][key] });
        }

        const queryResults = (await (await dbclient.get()).command({
            geoNear: collection.s.name,
            near: { type:'Point', coordinates: [hotel.gps.lng, hotel.gps.lat] },
            spherical: true,
            maxDistance: 1001,
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

        if(hotel.city_id){
            const cityResults = await collection.find({
                $and: [
                    {
                        country_id: hotel.country_id,
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
        spResolver.resolveHotel(spHotel._id, MapState.createOffline());
    }
    async $map(spHotel, zkId, map_key){
        const alias = [];
        if(spHotel.name) alias.push(spHotel.name);
        if(spHotel.name_en) alias.push(spHotel.name_en);

        await ZkResolver.get(spHotel.supplier).map(zkId, spHotel.id, alias);
        await SpResolver.get(spHotel.supplier).resolveHotel(spHotel._id, MapState.createStrict(zkId, map_key));
    }
    async $fuzzy(spHotel, fuzzy){
        SpResolver.get(spHotel.supplier).resolveHotel(spHotel._id, MapState.createFuzzy(fuzzy));
    }
    async $alone(spHotel){
        SpResolver.get(spHotel.supplier).resolveHotel(spHotel._id, MapState.createAlone());
    }

    async $insert(spHotel){
        const spResolver = SpResolver.get(spHotel.supplier);
        const zkResolver = ZkResolver.get(spHotel.supplier);

        const zkHotel = Object.assign({}, spHotel);
        delete zkHotel.mode;
        delete zkHotel.map_state;
        zkHotel.supplier_from = zkHotel.supplier;
        delete zkHotel.supplier;
        delete zkHotel.id;
        // 插入sai酒店库
        const zkId = zkResolver.insert(zkHotel, spHotel.id);
        // 更新sp酒店库匹配信息
        spResolver.resolveHotel(spHotel._id, MapState.createStrict(zkId, -1));

        const spCollection = await getSpHotelCollection();
        // 用新插入的酒店反查sp酒店库去重
        const remapResult = await this.$searchSimilarHotel(zkHotel, spCollection, {
            'mode': 'R',
            _id: { $ne: spHotel._id },
            'map_state.fuzzy': { $ne: null }
        });

        for(let remapHotel of remapResult){
            const diffResult = diff(remapHotel, zkHotel);
            
            try{
                if(MappingLevel.isHighest(diffResult)){
                    //返查自动匹配
                    await this.$map(remapHotel.hotel, zkId, diffResult);
                }else{
                    //返查更新fuzzy信息
                    await spResolver.updateHotel(remapHotel.hotel._id, {
                        $set: {
                            'map_state.timestamp': new Date().valueOf(),
                            [`map_state.fuzzy.${zkId}`]: diffResult
                        }
                    });
                }
            }catch(e){
                console.error(e);
            }
        }
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
        if(MapState.isFuzzy(spHotel.map_state)){
            await this.$map(spHotel, zkId, spHotel.map_state.fuzzy[zkId]);
        }
    }

    async insert(spId, sp, timestamp){
        const spResolver = SpResolver.get(sp);
        const spHotel = await spResolver.queryHotel(spId, sp);
        if(!MapState.isFuzzy(spHotel.map_state)){
            return 1;  //状态已变更（非fuzzy状态）
        }
        if(timestamp && spHotel.map_state.timestamp!==timestamp){
            return 3; //fuzzy信息变更
        }

        await this.$insert(spHotel);
    }

    async autoMap(){
        const hotelCursor = await  this.$findSpNotResolve();
        const zkHotelCollection = await getZkHotelCollection();

        let spHotel = null;

        while((spHotel = await cursor.next())){

            if(spHotel.mode==='D'){
                // offline sp hotel
                try{
                    await this.$offline(spHotel);
                }catch(e){
                    console.error(e);
                }
                continue;
            }

            const similarZkHotels = await this.$searchSimilarHotel(spHotel, zkHotelCollection);
            if(similarZkHotels.length===0){
                /*
                * doesn't map
                * insert as new
                */
                try{
                    this.$alone(spHotel);
                    //await this.$insert(spHotel);
                }catch(e){
                    console.log(e);
                }
                continue;
            }


            const fuzzy = {};

            for(let zkHotelResult of queryResults){
                const diffResult = diff(zkHotelResult, spHotel);
                if(MappingLevel.isHighest(diffResult)){
                    //免审
                    await this.$map(spHotel, zkHotelResult.hotel._id, diffResult);
                    return;
                }
                fuzzy[zkHotelResult.hotel_id] = diffResult;
            }

            await this.$fuzzy(spHotel);
        }
    }
}