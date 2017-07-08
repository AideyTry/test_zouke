const TeamController = require('../TeamController');
const PayStream = require('../@logic/PayStream');

module.exports = class MyPayStreamController extends TeamController {

    //约定许可证
    $meta(){
        return {
            access: {
                default: {
                    'offline_order': this.P.OFFLINE_ORDER.GATHERING
                }
            }
        }
    }

    //发起收款
    async collection(id,reo,currency,money){
        if(!reo||!currency||!money) return this.renderJSON({ code:1, msg:'illigal args' });

        if(reo) reo = parseFloat(reo);
        if(money) money = parseFloat(money);

        // zero
        if(!money||!reo) return this.renderJSON({ code:1, msg:'illigal args' });

        const payStream = new PayStream();
        let user = this.$getUser();
        const result = await payStream.collection(id,user,reo,currency,money);

        if(!result){
            return this.renderJSON({ code:2, msg:'can not collection pay stream' });
        }
        this.renderJSON({code:0});
    }

    //取消收款
    async cancel(id){
        const payStream = new PayStream();
        let user = this.$getUser();
        const result = await payStream.cancel(id,user);

        if(!result){
            return this.renderJSON({ code:2, msg:'can not cancel pay stream' });
        }
        this.renderJSON({code:0});
    };

    //录入付款信息（生成流水）
    async commit(id,provider,extras,paytime){
        const payStream = new PayStream();
        let user = this.$getUser();

        if(!provider || !paytime){
            return this.renderJSON({ code:1, msg: 'data check valid fail' });
        }
        const result = await payStream.commit(id,user,provider,extras,paytime);

        if(!result){
            return this.renderJSON({ code:2, msg:'can not commit pay stream' });
        }
        this.renderJSON({code:0});
    };

};