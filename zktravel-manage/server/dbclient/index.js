const mongodb = require('mongodb');
const connectConfig = require('./connectConfig');
const collectionConfig = require('./collectionConfig');

const cachedDB = new Map();

async function connectDB(config){
    const db = await mongodb.MongoClient.connect(config.connect, { poolSize: 4 });
    if(config.admin&&config.db){
        return db.db(config.db);
    }

    return db;
}

async function getDB(name){
    if(cachedDB.get(name)) return await cachedDB.get(name);

    const connectDBTask = connectDB(connectConfig[name]);
    cachedDB.set(name, connectDBTask);

    try{
        const db = await connectDBTask;
        cachedDB.set(name, db);
        return db;
    }catch(e){
        cachedDB.delete(name);
        throw e;
    }
}

async function getCollection(name){
    const { db, collection } = collectionConfig[name];
    return (await getDB(db)).collection(collection);
}

exports.get = getDB;

exports.collections = {
    get: getCollection
}