const dbclient = requireRoot('db');

module.exports = class User {
    /*
     * field: id
     * field: name
     * field: p
    */

    static get PERMISSION(){
        return {
            /* 团房 */
            OFFLINE_ORDER: {
                PUBLISH: 1,                     //发布需求
                REQUIREMENT_UPDATE: 1<<1,       //更新需求
                DISPATCH: 1<<2,                 //分配需求
                TOGGLEVALID: 1<<3,              //需求切换无效/有效       
            }
        }
    }

    get PERMISSION(){
        return User.PERMISSION;
    }

    checkPermission(type, permission){
        const p_type = this.p[type.toLowerCase()];
        if(!p_type) return false;
        return p_type&permission === permission;
    }

    static async get(id){
        const db = await dbclient.get();
        const userCollection = await db.collection('zkmanager_user');
        const user = await userCollection.findOne({ _id:id });
        if(!user){
            return null;
        }

        return new User(id, {
            name: user.name,
            p: user.p,
            role: user.role,
            roleName: user.role_name
        });
    }
    constructor(id,  { name, p, role, roleName }){
        Object.defineProperties(this, {
            id: { value: id },
            name: { value: name },
            p: { value: p },
            role: { value: role },
            roleName: { value: roleName }
        });
    }
}