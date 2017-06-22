const TeamController = require('../TeamController');
const PayStream = require('../@logic/PayStream');

module.exports = class MyPayStreamController extends TeamController {
    //约定订单状态
    $meta(){
        return {
            access: {
                'commit': {
                    'offline_order': this.P.OFFLINE_ORDER.GATHERING
                }
            }
        }
    }
    //提交付款信息
    async commit(id,provider,extras,paytime){
        const payStream = new PayStream();
        //拿到当前用户信息，更新表的时候做id校验
        let user = this.$getUser()
        /***
         * 进行业务逻辑之前，要根据业务需求来判断是否需要进行数据校验,不通过直接驳回请求。
         ****/
        const result = await payStream.update(id,user,provider,extras,paytime);
        //数据库操作失败
        if(!result){
            return this.renderJSON({ code:2, msg:'can not commit pay stream' });
        }
        //数据库操作成功
        this.renderJSON({code:0});
    }
};