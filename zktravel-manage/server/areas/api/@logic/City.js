const dbclient = requireRoot('dbclient');

module.exports = class City{
    async query(keyword){
        const collection = await dbclient.collections.get('zk_zones');
        const reg = new RegExp(keyword, 'i');
        const list = await collection.find({
            type:'city', 
            $or: [ { name: reg }, { name_en: reg } ]
        }, { name:1, name_en:1, country_name:1 }).limit(10).toArray();
        return list;
    }
}