const TeamController = require('../TeamController');
const TeamRequirement = require('../@logic/Requirement');
const Order = require('../@logic/Order');

const triggerInsert = Symbol();
const update = Symbol();

// 团房需求
module.exports = class TeamReqController extends TeamController {
    $meta(){
        return {
            access: {
                'invalid-req': {
                    'offline_order': this.P.OFFLINE_ORDER.DISPATCH
                },
                'dispatch': {
                    'offline_order': this.P.OFFLINE_ORDER.DISPATCH
                },
                'update': { 
                    'offline_order': [
                        this.P.OFFLINE_ORDER.UPDATE_SELF_REQUIREMENT,
                        this.P.OFFLINE_ORDER.UPDATE_ALL_REQUIREMENT
                    ] 
                },
                default: {
                    'offline_order': this.P.OFFLINE_ORDER.PUBLISH
                }
            }
        }
    }
    async [triggerInsert](name, needCheck){

        const teamRequirement = new TeamRequirement();
        let requirement = this.request.body;
        
        if(needCheck){
            requirement = teamRequirement.validRequirement(this.request.body);

            if(
                !requirement||
                (!requirement.budget_min&&!requirement.budget_max&&!requirement.budget_mark)
            ){
                this.renderJSON({code:1, msg: 'data check valid fail'});
                return;
            }
        }

        const id = await teamRequirement[name](requirement, this.$getUser());
        this.renderJSON({ code: 0, orderId: id }); 
    }
    async publish(){
        await this[triggerInsert]('publish',true);
    }
    async draft(){
        await this[triggerInsert]('draft',false);
    }
    async draftPublish(id, requirement){
        const teamRequirement = new TeamRequirement();

        let result = false; 
        if(requirement){
            const transRequirement = teamRequirement.validRequirement(requirement);
            if(!transRequirement){
                this.renderJSON({ code:1, msg: 'data check valid fail' });
                return;
            }
            result = await teamRequirement.draftPublish(id, transRequirement);
        }else{
            result = await teamRequirement.draftPublish(id);
        }
        if(result) this.renderJSON({ code:0 });
        else this.renderJSON({ code:2, msg: 'can not publish this draft' });
    }

    async [update](id, requirement, teamRequirement, wait_for_publish){
        const result = await teamRequirement.update(
            id,
            requirement,
            this.$getUser(),
            this.userInfo.checkPermission(
                'offline_order', 
                this.P.OFFLINE_ORDER.UPDATE_ALL_REQUIREMENT
            ),
            wait_for_publish
        );

        switch(result){
            case -1:
                this.renderJSON({ code: 2, msg: 'can not update' })
                return;
            case -2:
                this.renderJSON({ code: -2, msg: 'access deny' })
                return;
            case true:
                this.renderJSON({ code: 0 });
                return;
            case false:
                this.renderJSON({ code: 3, msg: 'status change' });
                return;
        }
    }

    //订单处于未发布状态
    async draftUpdate(id, requirement){
        await this[update](id, requirement, new TeamRequirement(), true);
    }
    //订单处于已发布状态
    async update(id, requirement){
        const teamRequirement = new TeamRequirement();
        const transRequirement = teamRequirement.validRequirement(requirement);
        if(!transRequirement){
            this.renderJSON({ code:1, msg: 'data check valid fail' });
            return;
        }

        await this[update](id, transRequirement, teamRequirement, false);
    }

    async dispatch(id, user, dead_line){
        //分配
        const order = new Order();

        const result = await order.dispatch(id, user, dead_line,  this.$getUser());

        if(result) this.renderJSON({ code:0 });
        else this.renderJSON({ code:2, msg: 'can not dispatch this order' });
    }

}