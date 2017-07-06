const dbclient = requireRoot('dbclient');

module.exports = class Order {
    async get(id){
        const offlineOrder = await dbclient.collections.get('offline_order');
        return await offlineOrder.findOne({_id:id}, { requirement:1, price:1, creator:1 });
    }
}