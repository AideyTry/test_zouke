const LController = requireRoot('common/LController');
const TeamRequirement = require('../logic/TeamRequirement');

// 团房需求
module.exports = class TeamReqController extends LController {
    async $beforeAction(){
        const result = await super.$beforeAction();
        if(result === false) return false;

        const requirement = this.request.body;
        //check
        
    }
    async publish(){
        const teamRequirement = new TeamRequirement();
        const id = await teamRequirement.publish(this.request.body);
        this.renderJSON({ code: 0, orderId: id });
    }
    async draft(){
        const teamRequirement = new TeamRequirement();
        const id = await teamRequirement.draft(this.request.body);
        this.renderJSON({ code: 0, orderId: id });
    }
}