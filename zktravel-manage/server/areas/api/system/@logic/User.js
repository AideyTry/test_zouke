const dbclient = requireRoot('dbclient');

module.exports = class SystemUser{
    async list(role){
        const collection = await dbclient.collections.get('zkmanager_user');
        const list = await collection.find({ role }).toArray();
        return list.map(u=>({
                    id: u._id,
                    name: u.name,
                    role: u.role,
                    role_name: u.role_name})
                );
    }
}