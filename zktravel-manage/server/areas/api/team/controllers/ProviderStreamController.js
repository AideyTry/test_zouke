const TeamController = require('../TeamController');
const ProviderStream = require('../@logic/ProviderStream');

module.exports = class MyProviderStream extends TeamController {

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

    //录入供应商信息(生成流水)
    async change(id,provider_obj){
        const providerStream = new ProviderStream();
        //拿到当前用户信息，更新表的时候做id校验
        let user = this.$getUser();
        /***
         * 进行业务逻辑之前，要根据业务需求来判断是否需要进行数据校验,不通过直接驳回请求。
         ****/
        provider_obj = providerStream.validProviderObj(provider_obj);
        //表单信息校验失败
        if(!provider_obj){
            return this.renderJSON({ code:1, msg: 'data check valid fail' });
        }
        const result = await providerStream.edit(id,user,provider_obj);
        //数据库操作失败
        if(!result){
            return this.renderJSON({ code:2, msg:'can not entry provider stream' });
        }
        //数据库操作成功
        this.renderJSON({code:0});
    }
};