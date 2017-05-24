const { DEBUG } = requireRoot('env');
const dbclient = requireRoot('db');

module.exports = class User {
    /*
     * field: id
     * field: name
     * field: p
    */
    static async get(id){
        if(DEBUG){
            id=600001;
        }

        const db = await dbclient.get();
        const userCollection = await db.collection('zkmanager_user');
        const user = await userCollection.findOne({ _id:id });
        if(!user){
            return null;
        }

        return new User(id, user.name, user.p);
    }
    constructor(id, name, p){
        Object.defineProperties(this, {
            id: { value: id },
            name: { value: name },
            p: { value: p }
        });
    }
}