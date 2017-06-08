const dbclient = requireRoot('db');

module.exports = class SystemUser{
    async list(role){
        const db = await dbclient.get();
        const collection = await db.collection('zkmanager_user');
        return await collection.find({ role }).toArray();
    }
}