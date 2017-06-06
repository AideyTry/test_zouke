const LController = requireRoot('common/LController');
const TeamRequirement = require('../logic/TeamRequirement');

const triggerInsert = Symbol();

// 团房需求
module.exports = class TeamReqController extends LController {

    [triggerInsert](name){
        const requirement = teamRequirement.validRequirement(this.request.body);
        if(!requirement){
            this.renderJSON({code:1, msg: 'data check valid fail'});
            return;
        }

        const { id: uid, name: uname } = this.userInfo;
        const teamRequirement = new TeamRequirement();

        const id = await teamRequirement[name](requirement, { id: uid, name: uname });
        this.renderJSON({ code: 0, orderId: id });
    }
    async publish(){
        this[triggerInsert]('publish');
    }
    async draft(){
        this[triggerInsert]('draft');
    }
}