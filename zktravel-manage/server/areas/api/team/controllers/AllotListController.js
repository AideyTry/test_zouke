const TeamController = require('../TeamController');
const AllotList = require('../@logic/AllotList');

module.exports = class AllotListController extends TeamController {

    //约定许可证
    $meta(){
        return {
            access: {
                'commit': {
                    'offline_order': this.P.OFFLINE_ORDER.UPDATE_ROOM_PERSON
                }
            }
        }
    }

    //录入分房名单
    async collection(id,content){
        const allotList = new AllotList();
        //拿到当前用户信息，更新表的时候做id校验
        let user = this.$getUser();
        /***
         * 进行业务逻辑之前，要根据业务需求来判断是否需要进行数据校验,不通过直接驳回请求。
         ****/
        const result = await allotList.allot_list(id,user,content);
        //数据库操作失败
        if(!result){
            return this.renderJSON({ code:2, msg:'can not collection allot list' });
        }
        //数据库操作成功
        this.renderJSON({code:0});
    }
};