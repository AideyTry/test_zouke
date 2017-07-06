const TeamController = require('../TeamController');
const ModifyingCost = require('../@logic/ModifyingCost');

module.exports = class myModifyingCost extends TeamController {

    //约定许可证
    $meta(){
        return {
            access: {
                'change': {
                    'offline_order': this.P.OFFLINE_ORDER.MODIFYING_COST
                }
            }
        }
    }

    //修改成本(生成流水)
    async change(id,modifying_obj){
        const modifyingCost = new ModifyingCost();
        //拿到当前用户信息，更新表的时候做id校验
        let user = this.$getUser();
        /***
         * 进行业务逻辑之前，要根据业务需求来判断是否需要进行数据校验,不通过直接驳回请求。
         ****/
        modifying_obj = modifyingCost.validModifyingCost(modifying_obj);
        //表单信息校验失败
        if(!modifying_obj){
            return this.renderJSON({ code:1, msg: 'data check valid fail' });
        }
        const result = await modifyingCost.commit(id,user,modifying_obj);
        //数据库操作失败
        if(!result){
            return this.renderJSON({ code:2, msg:'can not entry modifying cost' });
        }
        //数据库操作成功
        this.renderJSON({code:0});
    }

};