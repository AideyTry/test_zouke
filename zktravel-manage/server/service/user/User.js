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
                UPDATE_SELF_REQUIREMENT: 1<<1,  //修改自己需求
                UPDATE_ALL_REQUIREMENT: 1<<2,   //修改所有需求
                DISPATCH: 1<<3,                 //分配需求
                TOGGLE_VALID: 1<<4,             //设置需求有效/无效

                FILL_PRICE: 1<<5,               //填写报价
                APPLY_HISTORY_PRICE: 1<<6,      //应用历史报价
                UPDATE_PRICE: 1<<7,             //修改自己报价
                CHECK_PRICE: 1<<8,              //审核报价
                CONFIRM_PRICE: 1<<9,            //确定用户是否同意报价

                FILL_ORDER: 1<<10,              //填写订单
                VIEW_SP_INFO: 1<<11,            //查看订单供应商信息
                VIEW_USER_TERM: 1<<12,          //查看订单用户条款
                UPDATE_ORDER: 1<<13,            //修改订单
                EXPORT_VOUCHER: 1<<14,          //导出voucher

                UPDATE_ROOM_PERSON: 1<<15,      //填写分房名单
                GATHERING: 1<<16,               //收款
                REFUND: 1<<17,                  //退款
            }
        }
    }

    get PERMISSION(){
        return User.PERMISSION;
    }

    checkPermission(type, permission){
        const p_type = this.p[type.toLowerCase()];
        if(!p_type) return false;
        return (p_type&permission) === permission;
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