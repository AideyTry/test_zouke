const BaseOrder = require('./BaseOrder');

module.exports = class VoucherOrders extends BaseOrder {
    async query(uuid, { page=0, pageSize=10 }){

        //得到collection对象
        const collection = await this.$getCollection();

        //根据条件查找orderDoc
        return await collection.findOne({
            "creator.id":uuid,
        }, { voucher_detail:1 });

    }
};