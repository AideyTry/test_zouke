const LController = requireRoot('common/LController');
const Price = require('../@logic/Price');

module.exports = class MyOfflineOrderController extends LController {
    $meta(){
        return {
            access: {
                'commit': {
                    'offline_order': this.P.OFFLINE_ORDER.UPDATE_PRICE
                },
                'check-price': { 
                    'offline_order': this.P.OFFLINE_ORDER.CHECK_PRICE
                },
                'confirm-price': {
                    'offline_order': this.P.OFFLINE_ORDER.CONFIRM_PRICE
                }
            }
        }
    }
    // commit for check by admin
    async commit(id, requirementLastTime, price){
        const s_price = new Price();
        const transPrice = price?s_price.validPrice(price):null;
        if(price&&!transPrice) return this.renderJSON({ code:1, msg: 'data check valid fail' });

        const { id: uid, name: uname, role, roleName } = this.userInfo;

        const result = await s_price.commit(id, requirementLastTime, transPrice, { id:uid, name: uname, role, roleName });
        if(!result) return this.renderJSON({ code:2, msg: 'can not commit' });

        this.renderJSON({ code: 0 });
    }
    async checkPrice(id, price){
        /*
        const s_price = new Price();
        const transPrice = price?s_price.validPrice(price):null;
        if(price&&!transPrice) return this.renderJSON({ code:1, msg: 'data check valid fail' });
        */
    }
    // confirm price
    async confirmPrice(){

    }
}