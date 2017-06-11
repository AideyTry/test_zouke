const mongodb = require('mongodb');
const createToken = Symbol('db_create_token');

const $$connect = Symbol('connect');
const $$connectString = Symbol('connectString');
const $$db = Symbol('db');

const cache = {};

module.exports = class DB {
    static async use(connectString, token=''){
        const cacheString = connectString + token;
        if(!cache[cacheString]){
            const db = new DB(createToken, connectString);
            await db[$$connect]();
            db[$$db].on('close', () => {
                delete cache[cacheString];
            });
            cache[cacheString] = db;
            return db;
        }
        return cache[cacheString];
    }

    async [$$connect](){
        const db = await mongodb.MongoClient.connect(
            this[$$connectString],
            {
                poolSize: 2
            }
        );
        this[$$db] = db;
    }

    constructor(token, connectString){
        if(createToken!==token) throw new Error('use DB.use method get db instance');
        this[$$connectString] = connectString;
    }
    collection(name){
        return new Promise((resolve, reject) => {
            this[$$db].collection(name, {strict: true}, (err, col) => {
                if(err) reject(err);
                else resolve(col);
            })
        })
    }
    async collections(){
        return this[$$db].collections();
    }
    async close(){
        this[$$db].close();
    }
    async command(...arg){
        return await this[$$db].command(...arg);
    }
    async genId(col_name){
        const cfg_counters_collection = await this.collection('cfg_counters');
        const result = await cfg_counters_collection.findOneAndUpdate(
            { _id: col_name }, 
            { $inc: { seq: 1 } },
            { returnOriginal: false }
        );
        if(result.value) return result.value.seq;

        await cfg_counters_collection.findOneAndUpdate(
            { _id: col_name },
            { $setOnInsert: { seq: 60000 } },
            { upsert: true }
        );
        return (await cfg_counters_collection.findOneAndUpdate(
            { _id: col_name }, 
            { $inc: { seq: 1 } },
            { returnOriginal: false }
        )).value.seq;
    }
}

process.on('SIGINT', async () => {
    let dbError = 0;
    for(let key of Object.keys(cache)){
        try{
            await cache[key].close();
        }catch(e){
            dbError = 1;
        }
    }
    process.exit(dbError);
});