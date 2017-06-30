const TeamController = require('../TeamController');
const Complains = require('../@logic/Complains');

module.exports = class ComplainsController extends TeamController {

    //填写发票
    async commit(id,content){
        if(!content || content.trim() === ''){
            return this.renderJSON({ code:1, msg: 'data check valid fail' });
        }
        const complains = new Complains();
        //拿到当前用户信息，更新表的时候做id校验
        let user = this.$getUser();
        /***
         * 进行业务逻辑之前，要根据业务需求来判断是否需要进行数据校验,不通过直接驳回请求。
         ****/
        const result = await complains.commit(id,user,content);
        //数据库操作失败
        if(!result){
            return this.renderJSON({ code:2, msg:'can not commit complains' });
        }
        //数据库操作成功
        this.renderJSON({code:0});
    }
};