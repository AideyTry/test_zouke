const TeamController = require('../TeamController');
const Complains = require('../@logic/Complains');

module.exports = class ComplainsController extends TeamController {

    //填写发票
    async commit(id,content){
        if(!content || content.trim() === ''){
            return this.renderJSON({ code:1, msg: 'data check valid fail' });
        }
        const complains = new Complains();
        let user = this.$getUser();
        const result = await complains.commit(id,user,content);

        if(!result){
            return this.renderJSON({ code:2, msg:'can not commit complains' });
        }
        this.renderJSON({code:0});
    }
};