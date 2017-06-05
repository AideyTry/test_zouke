const dbclient = requireRoot('db');

module.exports = class TeamRequirement {
    async $getCollection(){
        const db = await dbclient.get();
        return await db.collection('offline_order');
    }
    async $insert(requirement, status){
        const collection = await this.$getCollection();
        const today = new Date().format('YYMMDD');
        const idReg = new RegExp(`^T${today}`);
        const maxIdResult = await collection.find({_id: idReg}, {_id: 1}).sort({ _id: -1 }).next();

        const nextId = maxIdResult ? `T${today}${ 
            (parseInt(maxIdResult._id.substr(today.length+1)) + 1).toString().padStart(3, '0')
        }` : `T${today}001`;

        await collection.insertOne({
            _id: nextId,
            status,
            requirement
        });
        return nextId;
    }
    async publish(data){
        return await this.$insert(data, 2);
    }
    async draft(data){
        return await this.$insert(data, 1);
    }
}