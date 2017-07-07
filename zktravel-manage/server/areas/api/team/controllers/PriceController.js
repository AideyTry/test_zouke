const TeamController = require('../TeamController');
const Price = require('../@logic/Price');
const { DEBUG, DES_PWD } = requireRoot('env');
const pricePage = `http://${DEBUG?'wx.test.zouke.com':'w.zouke.com'}/n/team/price?`;
const DES = require('@local/des');

module.exports = class MyOfflineOrderController extends TeamController {
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

        const result = await s_price.commit(id, requirementLastTime, price, this.$getUser());
        if(!result) return this.renderJSON({ code:2, msg: 'can not commit price' });

        this.renderJSON({ code: 0 });
    }
    //管理员审核不通过
    async reject(id, reason){
        const s_price = new Price();

        const result = await s_price.reject(id, this.$getUser(), reason);
        if(!result) return this.renderJSON({ code:2, msg: 'can not reject price' });

        this.renderJSON({ code: 0 });
    }
    //管理员审核通过
    async resolve(id, price){
        const s_price = new Price();
        price = s_price.validUserPolicy(price);
        if(!price){
            return this.renderJSON({ code:1, msg: 'data check valid fail' });
        }

        const result = await s_price.resolve(id, this.$getUser(), price);
        if(!result) return this.renderJSON({ code:2, msg: 'can not reject price' });

        this.renderJSON({ code: 0 });
    }
    //用户同意报价
    async agree(id, index, selectIndex){
        if(
            index==undefined||
            !Array.isArray(selectIndex)
        ) return this.renderJSON({ code: 5, msg: 'invalid args' });

        const price = new Price();
        const result = await price.agree(id, index, selectIndex, this.$getUser());
        if(result) this.renderJSON({ code:0 });
        else this.renderJSON({ code:2, msg:'can not agree this order price' });
    }
    //用户不同意报价
    async disagree(id){
        const price = new Price();
        const result = await price.disagree(id, this.$getUser())
        if(result) this.renderJSON({ code:0 });
        else this.renderJSON({ code:2, msg:'can not disagree this order price' });
    }

    async confirmQr(id, index){
        const cuid = this.$getUser().id;
        const des = new DES(DES_PWD);
        const sign = des.encrypt(id+cuid+index);
        this.renderQR(`${pricePage}id=${id}&cuid=${cuid}&index=${index}&sign=${sign}`);
    }
}