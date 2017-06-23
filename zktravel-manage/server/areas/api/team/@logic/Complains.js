const BaseOrder = require('./BaseOrder');
const compare = require('@local/compare');

module.exports = class Complains extends BaseOrder {

    //数据入库
    async commit(id,user,content){
        /**方法前面带$的说明是从父类继承来的**/
        return await this.$update(
            {
                _id: id,
                "creator.id":user.id
            },
            {
                //插入数据
                $set:{
                    Complain_content:content,
                },
                $push: {
                    //日志记录
                    logs: this.$createShiftUpdate({ type: 'user:complain_content', time: this.$createTime(), user })
                }
            }
        )
    }
};