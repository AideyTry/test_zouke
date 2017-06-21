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

    //提交
    async commit(id,road,reMark,payTime){
        /***
         * 进行业务逻辑之前，要根据业务需求来判断是否需要进行数据校验,不通过直接驳回请求。
         ****/

        //业务逻辑
        const payStream = new PayStream();
        const result = await payStream.update(id,road,reMark,payTime);
        //数据库操作失败
        if(!result){
            return this.renderJSON({ code:2, msg:'can not commit pay stream' });
        }
        //数据库操作成功
        this.renderJSON({code:0});
    }
};