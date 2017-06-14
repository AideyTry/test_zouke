const LController = requireRoot('common/LController');
const Price = require('../@logic/Price');

module.exports = class MyOfflineOrderController extends LController {
    $meta(){
        return {
            access: {
                'update': {
                    'offline_order': this.P.OFFLINE_ORDER.UPDATE_PRICE
                },
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
    async update(){
        const { id, requirementLastTime, price } = this.request.body;
        const s_price = new Price();
        const transPrice = s_price.validPrice(price)
        if(!transPrice) return this.renderJSON({ code:1, msg: 'data check valid fail' });

        const updateSuccess = await s_price.update(id, requirementLastTime, transPrice);
        if(!updateSuccess) return this.renderJSON({ code:2, msg: 'can not update' });

        this.renderJSON({ code: 0 });
    }
    // commit for check by admin
    async commit(){

    }
    async checkPrice(){

    }
    // confirm price
    async confirmPrice(){

    }
}