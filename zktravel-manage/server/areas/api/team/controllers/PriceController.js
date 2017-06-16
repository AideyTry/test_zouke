const LController = requireRoot('common/LController');
const Price = require('../@logic/Price');

module.exports = class MyOfflineOrderController extends LController {
    $meta(){
        return {
            access: {
                'commit': {
                    'offline_order': this.P.OFFLINE_ORDER.UPDATE_PRICE
                },
                'reject': {
                    'offline_order': this.P.OFFLINE_ORDER.CHECK_PRICE
                },
                'resolve': { 
                    'offline_order': this.P.OFFLINE_ORDER.CHECK_PRICE
                },
                'agree': {
                    'offline_order': this.P.OFFLINE_ORDER.CONFIRM_PRICE
                },
                'disagree': {
                    'offline_order': this.P.OFFLINE_ORDER.CONFIRM_PRICE
                },
            }
        }
    }
    // commit for check by admin
    async commit(id, requirementLastTime, price){
        const s_price = new Price();
        price = s_price.validPrice(price);
        if(!price) return this.renderJSON({ code:1, msg: 'data check valid fail' });

        const { id: uid, name: uname, role, roleName } = this.userInfo;

        const result = await s_price.commit(id, requirementLastTime, price, { id:uid, name: uname, role, roleName });
        if(!result) return this.renderJSON({ code:2, msg: 'can not commit price' });

        this.renderJSON({ code: 0 });
    }
    //管理员审核不通过
    async reject(id, reason){
        const s_price = new Price();

        const { id: uid, name: uname, role, roleName } = this.userInfo;

        const result = await s_price.reject(id, { id:uid, name: uname, role, roleName }, reason);
        if(!result) return this.renderJSON({ code:2, msg: 'can not reject price' });

        this.renderJSON({ code: 0 });
    }
    //管理员审核通过
    async resolve(id, price, userPolicy){
        const s_price = new Price();
        userPolicy = s_price.validUserPolicy(userPolicy);
        if(!userPolicy) this.renderJSON({ code:1, msg: 'data check valid fail' });
        if(price){
            price = s_price.validPrice(price);
            if(!price) return this.renderJSON({ code:1, msg: 'data check valid fail' });
        }

        const { id: uid, name: uname, role, roleName } = this.userInfo;

        const result = await s_price.resolve(id, { id:uid, name: uname, role, roleName }, userPolicy, price);
        if(!result) return this.renderJSON({ code:2, msg: 'can not reject price' });

        this.renderJSON({ code: 0 });
    }
    //用户同意报价
    async agree(){
        const price = new Price();
        
    }
    //用户不同意报价
    async disagree(){

    }
}