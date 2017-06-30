const MappingLevel = require('./MappingLevel');
const dbclient = requireRoot('dbclient');
const Pretreatment = require('./Pretreatment');
const intersection = require('lodash/intersection');

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
        if( hotel1.city_ids&&intersection(hotel1.city_ids, hotel2.city_ids).length>0){
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
    async genZkId(){
        const id = await dbclient.genId('zk_hotels');
        return parseInt(`1${id.toString()}`, 10);
    },
    async getZkHotelCollection(){
        if(!_zkCollection){
            _zkCollection = await dbclient.collections.get('zk_hotels');
        }
        return _zkCollection;
    },
    async getSpHotelCollection(){
        if(!_spCollection){
            _spCollection = await dbclient.collections.get('sp_hotels');
        }
        return _spCollection;
    }
}