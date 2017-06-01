/*
    map_state:{
        timestamp: xxxxxx,

        strict: zkhotelId,
        map_key: 7,

        fuzzy: {
            [_id]: map_key
        },
        fuzzy_level: []

        offline: true,

        alone: true,

        invalid: true
    }
*/
const MappingLevel = require('./MappingLevel');

function createBaseMapState(){
    return {
        timestamp: new Date().valueOf()
    };
}

module.exports = class MapState {
    static createOffline(){
        return Object.assign(createBaseMapState(), { offline: true });
    }
    static createInvalid(){
        return Object.assign(createBaseMapState(), { invalide: true });
    }
    static createAlone(){
        return Object.assign(createBaseMapState(), { alone: true });
    }
    static createStrict(zkId, map_key){
        return Object.assign(createBaseMapState(), { strict: zkId, map_key});
    }
    static createFuzzy(fuzzy){
        const set = new Set();
        const fuzzy_level = [];
        for(let mapKey of Object.values(fuzzy)){
            set.add(MappingLevel.getLevel(mapKey));
        }
        return Object.assign(createBaseMapState, { fuzzy, fuzzy_level: [...fuzzy_level] });
    }
    static isStrict(mapState){
        if(!mapState) return false;
        return !!mapState.strict;
    }
    static isFuzzy(mapState){
        if(!mapState) return false;
        return !!mapState.fuzzy;
    }
    static isOffline(mapState){
        if(!mapState) return false;
        return mapState.offline;
    }
    static isAlone(mapState){
        if(!mapState) return false;
        return mapState.alone;
    }
    static isInvalid(mapState){
        if(!mapState) return false;
        return mapState.invalid;
    }
}