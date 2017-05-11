const mongodb = require('mongodb');
const createToken = Symbol('db_create_token');
const privatePart = requireRoot('utils/privatePart');

const _ = privatePart({
    async connect(){
        const db = await mongodb.MongoClient.connect(
            _(this).connectString, {
                poolSize: 2
            }
        );
        _(this).db = db;
    }
});

const cache = {};

module.exports = class DB {
    static async use(connectString){
        if(!cache[connectString]){
            const db = new DB(createToken, connectString);
            await _(db).connect();
            cache[connectString] = db;
            return db;
        }
        return cache[connectString];
    }
    constructor(token, connectString){
        if(createToken!==token) throw new Error('use DB.use get instance');
        _(this).connectString = connectString;
    }
    collection(name){
        return new Promise((resolve, reject) => {
            _(this).db.collection(name, {strict: true}, (err, col) => {
                if(err) reject(err);
                else resolve(col);
            })
        })
    }
    async collections(){
        return _(this).db.collections();
    }
}