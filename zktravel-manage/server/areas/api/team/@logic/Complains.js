const BaseOrder = require('./BaseOrder');
const compare = require('@local/compare');

module.exports = class Complains extends BaseOrder {

    //数据入库
    async commit(id,user,content){

        /**方法前面带$的说明是从父类继承来的**/
        return await this.$update(
            {
                _id: id,
            },
            {
                $push: {
                    complain_content:{
                        "content":content,
                        "date":this.$createTime(),
                        "user":user
                    }
                }
            }
        )
    }
};