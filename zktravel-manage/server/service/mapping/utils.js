const MappingLevel = require('./MappingLevel');
const dbclient = requireRoot('db');
const { zk_collection_name, sp_collection_name } = require('../config');
const Pretreatment = require('./Pretreatment');

let _zkCollection = null;
let _spCollection = null;

module.exports = {
    diff({ dis, hotel:hotel1 }, hotel2 ){
        const h1_field = hotel1[Pretreatment.field];
        const h2_field = hotel2[Pretreatment.field];
        let result = 0;
        
        if(
            (h1_field.name&&(h1_field.name===h2_field.name))||
            (h1_field.name_en&&(h1_field.name_en===h2_field.name_en))
        ){
            result |= MappingLevel.NAME;
        }
        if( h1_field.phone&&(h1_field.phone===h2_field.phone)){
            result |= MappingLevel.PHONE;
        }
        if( h1_field.address&&(h1_field.address===h2_field.address)){
            result |= MappingLevel.ADDRESS;
        }
        if( hotel1.city_id&&(hotel1.city_id===hotel2.city_id)){
            result |= MappingLevel.CITY;
        }
        if( h1_field.url_web&&(h1_field.url_web===h2_field.url_web)){
            result |= MappingLevel.WEBURL;
        }

        if(dis<=50){
            result |= MappingLevel.GPS50;
        }else if(dis<=500){
            result |= MappingLevel.GPS500;
        }else if(dis<=1000){
            result |= MappingLevel.GPS1000;
        }
        
        return result;
    },
    async getDb(){
        return await dbclient.get();
    },
    async genZkId(){
        return await (await dbclient.get()).genId(zk_collection_name);
    },
    async getZkHotelCollection(single = false){
        if(!_zkCollection){
            const db = await dbclient.get(single?{token:'#mapping#'}:{});
            _zkCollection = await db.collection(zk_collection_name);
        }
        return _zkCollection;
    },
    async getSpHotelCollection(single = false){
        if(!_spCollection){
            const db = await dbclient.get(single?{token:'#mapping#'}:{});
            _spCollection = await db.collection(sp_collection_name);
        }
        return _spCollection;
    }
}