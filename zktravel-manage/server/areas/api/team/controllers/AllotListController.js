const TeamController = require('../TeamController');
const AllotList = require('../@logic/AllotList');

module.exports = class AllotListController extends TeamController {

    //约定许可证
    $meta(){
        return {
            access: {
                'collection': {
                    'offline_order': this.P.OFFLINE_ORDER.UPDATE_ROOM_PERSON
                }
            }
        }
    }

    //录入分房名单
    async collection(id,content){
        const allotList = new AllotList();
        let user = this.$getUser();
        const result = await allotList.allot_list(id,user,content);

        if(!result){
            return this.renderJSON({ code:2, msg:'can not collection allot list' });
        }
        this.renderJSON({code:0});
    }
};