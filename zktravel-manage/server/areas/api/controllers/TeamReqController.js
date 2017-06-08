const LController = requireRoot('common/LController');
const TeamRequirement = require('../logic/TeamRequirement');
const OfflineOrder = require('../logic/OfflineOrder');

const triggerInsert = Symbol();

// 团房需求
module.exports = class TeamReqController extends LController {
    $meta(){
        return {
            access: {
                'invalid-req': {
                    'offline_order': this.userInfo.PERMISSION.OFFLINE_ORDER.DISPATCH
                },
                'dispatch': {
                    'offline_order': this.userInfo.PERMISSION.OFFLINE_ORDER.DISPATCH
                },
                default: {
                    'offline_order': this.userInfo.PERMISSION.OFFLINE_ORDER.PUBLISH
                }
            }
        }
    }
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
    async draftPublish(){
        const teamRequirement = new TeamRequirement();
        const { id, requirement } = this.request.body;

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

    async update(){
        const teamRequirement = new TeamRequirement();
        const { id, requirement } = this.request.body;
        const transRequirement = teamRequirement.validRequirement(id, requirement);
        if(!transRequirement){
            this.renderJSON({ code:1, msg: 'data check valid fail' });
            return;
        }

        const result = await teamRequirement.update(id, transRequirement);
        //todo 
    }

    async invalidReq(){
        //需求审核不通过
        const { id } = this.request.body;
        const offlineOrder = new OfflineOrder();
        const result = await offlineOrder.invalidReq(id);
        if(result) this.renderJSON({ code:0 });
        else this.renderJSON({ code:2, msg: 'can not invalid this req' });
    }
    async dispatch(){
        //分配
        const { id, user } = this.request.body;
        const offlineOrder = new OfflineOrder();

        const result = await offlineOrder.dispatch(id, user);

        if(result) this.renderJSON({ code:0 });
        else this.renderJSON({ code:2, msg: 'can not dispatch this order' });
    }

}