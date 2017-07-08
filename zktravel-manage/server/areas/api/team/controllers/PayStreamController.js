const TeamController = require('../TeamController');
const PayStream = require('../@logic/PayStream');

module.exports = class MyPayStreamController extends TeamController {

    //约定许可证
    $meta(){
        return {
            access: {
                'commit': {
                    'offline_order': this.P.OFFLINE_ORDER.GATHERING
                }
            }
        }
    }

    //发起一笔收款
    async commit(id,provider,extras,paytime){
        const payStream = new PayStream();
        //拿到当前用户信息，更新表的时候做id校验
        let user = this.$getUser();
        /***
         * 进行业务逻辑之前，要根据业务需求来判断是否需要进行数据校验,不通过直接驳回请求。
         ****/
        if(!provider || !paytime){
            return this.renderJSON({ code:1, msg: 'data check valid fail' });
        }
        const result = await payStream.commit(id,user,provider,extras,paytime);
        //数据库操作失败
        if(!result){
            return this.renderJSON({ code:2, msg:'can not commit pay stream' });
        }
        //数据库操作成功
        this.renderJSON({code:0});
    };

    //取消一笔收款
    async cancel(id){
        const payStream = new PayStream();
        //拿到当前用户信息，更新表的时候做id校验
        let user = this.$getUser();
        /***
         * 进行业务逻辑之前，要根据业务需求来判断是否需要进行数据校验,不通过直接驳回请求。
         ****/
        const result = await payStream.cancel(id,user);
        //数据库操作失败
        if(!result){
            return this.renderJSON({ code:2, msg:'can not cancel pay stream' });
        }
        //数据库操作成功
        this.renderJSON({code:0});
    };

    //录入收款信息(生成流水)
    async collection(id,reo,currency,money){

        if(reo) reo = parseFloat(reo);
        if(money) reo = parseFloat(money);

        const payStream = new PayStream();
        //拿到当前用户信息，更新表的时候做id校验
        let user = this.$getUser();
        /***
         * 进行业务逻辑之前，要根据业务需求来判断是否需要进行数据校验,不通过直接驳回请求。
         ****/
        const result = await payStream.collection(id,user,reo,currency,money);
        //数据库操作失败
        if(!result){
            return this.renderJSON({ code:2, msg:'can not collection pay stream' });
        }
        //数据库操作成功
        this.renderJSON({code:0});
    }

};