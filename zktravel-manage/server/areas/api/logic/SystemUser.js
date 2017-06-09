const dbclient = requireRoot('db');

module.exports = class SystemUser{
    async list(role){
        const db = await dbclient.get();
        const collection = await db.collection('zkmanager_user');
        const list = await collection.find({ role }).toArray();
        return list.map(u=>({
                    id: u._id,
                    name: u.name,
                    role: u.role,
                    role_name: u.role_name})
                );
    }
}