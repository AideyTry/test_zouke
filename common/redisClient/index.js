const redis = require('redis');
const bluebird = require('bluebird');

const { REDIS_CONNECT } = require('../../config');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const cachedClient = {};

module.exports = {
    get(name){
        if(!cachedClient[name]){
            const { host, port, password, index=0 } = REDIS_CONNECT[name];
            const client = redis.createClient({ host, port, password });
            client.unref();
            client.select(index);
            cachedClient[name] = client;
            return client;
        }
        return cachedClient[name];
    }
}