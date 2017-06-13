const LController = requireRoot('common/LController');
const OfflineOrder = require('../@logic/Order');

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