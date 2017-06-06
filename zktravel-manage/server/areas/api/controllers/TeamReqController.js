const LController = requireRoot('common/LController');
const TeamRequirement = require('../logic/TeamRequirement');

const triggerInsert = Symbol();

// 团房需求
module.exports = class TeamReqController extends LController {
    async [triggerInsert](name){
        const teamRequirement = new TeamRequirement();
        const requirement = teamRequirement.validRequirement(this.request.body);
        
        if(!requirement){
            this.renderJSON({code:1, msg: 'data check valid fail'});
            return;
        }

        const { id: uid, name: uname } = this.userInfo;
        const id = await teamRequirement[name](requirement, { id: uid, name: uname });
        this.renderJSON({ code: 0, orderId: id });
    }
    async publish(){
        await this[triggerInsert]('publish');
    }
    async draft(){
        await this[triggerInsert]('draft');
    }
}