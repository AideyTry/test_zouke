const client = require('@local/mongodb-client');
const register = require('@local/mongodb-client/register');

const { MONGO_CONNECT } = require('../../config');

module.exports = function(collectionConfig){
    register('connect', MONGO_CONNECT);
    register('collection', collectionConfig);

    if(!client.genId){
        client.genId = async function(name){
            const targetCollection = await client.collections.get(name);
            const cfg_counters_collection = targetCollection.s.db.collection('cfg_counters');

            const result = await cfg_counters_collection.findOneAndUpdate(
                { _id: targetCollection.collectionName }, 
                { $inc: { seq: 1 } },
                { returnOriginal: false }
            );
            if(result.value) return result.value.seq;

            await cfg_counters_collection.findOneAndUpdate(
                { _id: targetCollection.collectionName },
                { $setOnInsert: { seq: 60000 } },
                { upsert: true }
            );
            return (await cfg_counters_collection.findOneAndUpdate(
                { _id: targetCollection.collectionName }, 
                { $inc: { seq: 1 } },
                { returnOriginal: false }
            )).value.seq;
        };
    }

    return client;
}

process.on('SIGINT', async () => {
    let dbError = 0;
    try{
        await client.close();
    }catch(e){
        dbError = 1;
    }
    process.exit(dbError);
});