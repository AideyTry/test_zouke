//创建索引

require('../requireRoot');
require('@local/common/core/w/prototype');
const dbclient = requireRoot('dbclient');

function genIndex(field, type=1){
    return { key: { [field]: type }, name: field };
}

async function run(){
    const zkHotels = await dbclient.collections.get('zk_hotels');
    const spHotels = await dbclient.collections.get('sp_hotels');

    await spHotels.createIndexes([
        genIndex('status'),
        genIndex('supplier'),
        genIndex('mode'),
        genIndex('id'),
        genIndex('country_id'),
        genIndex('city_ids'),
        genIndex('geo', '2dsphere'),
        genIndex('map_state.timestamp'), // exists map_state field
        genIndex('map_state.invalid'),
        genIndex('map_state.strict'),
        genIndex('map_state.offline'),
        genIndex('map_state.alone'),
        genIndex('map_state.fuzzy._exists'),
        genIndex('map_state.fuzzy_level'),
        genIndex('map_pretreatment_field._v'),
        genIndex('map_pretreatment_field.name'),
        genIndex('map_pretreatment_field.name_en'),
        genIndex('map_pretreatment_field.phone'),
        genIndex('map_pretreatment_field.url_web'),
        genIndex('map_pretreatment_field.address')
    ]);

    await zkHotels.createIndexes([
        genIndex('status'),
        genIndex('mode'),
        genIndex('country_id'),
        genIndex('city_ids'),
        genIndex('geo', '2dsphere'),
        genIndex('name'),
        genIndex('name_en'),
        genIndex('map_pretreatment_field._v'),
        genIndex('map_pretreatment_field.name'),
        genIndex('map_pretreatment_field.name_en'),
        genIndex('map_pretreatment_field.phone'),
        genIndex('map_pretreatment_field.url_web'),
        genIndex('map_pretreatment_field.address')
    ])
}

/*
run().then(()=>{
    process.exit();
});
*/