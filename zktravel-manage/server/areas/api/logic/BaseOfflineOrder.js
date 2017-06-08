const dbclient = requireRoot('db')

module.exports = class BaseOfflineOrder{
    async $getCollection(){
        const db = await dbclient.get();
        return await db.collection('offline_order');
    }
    async $insert(order){
        const collection = await this.$getCollection();
        const today = new Date().format('YYMMDD');
        const idReg = new RegExp(`^T${today}`);
        const maxIdResult = await collection.find({_id: idReg}, {_id: 1}).sort({ _id: -1 }).next();


        const date = new Date().format('YYYY-MM-DD hh:mm:ss');

        const nextId = maxIdResult ? `T${today}${ 
            (parseInt(maxIdResult._id.substr(today.length+1)) + 1).toString().padStart(3, '0')
        }` : `T${today}001`;

        await collection.insertOne(Object.assign(order, {
            _id: nextId,
            create_time: date,
            last_update:date
        }));

        return nextId;
    }
    async $update(query, update){
        const collection = await this.$getCollection();
        if(!update.$set) update.$set = {};
        update.$set.last_update = new Date().format('YYYY-MM-DD hh:mm:ss');
        const result = await collection.updateOne(query, update);
        if(result.modifiedCount===1) return true;

        return false;
    }
}