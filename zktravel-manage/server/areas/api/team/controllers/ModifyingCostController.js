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
        let user = this.$getUser();

        modifying_obj = modifyingCost.validModifyingCost(modifying_obj);

        if(!modifying_obj){
            return this.renderJSON({ code:1, msg: 'data check valid fail' });
        }
        const result = await modifyingCost.commit(id,user,modifying_obj);

        if(!result){
            return this.renderJSON({ code:2, msg:'can not entry modifying cost' });
        }
        this.renderJSON({code:0});
    }

};