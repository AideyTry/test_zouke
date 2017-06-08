const dbclient = requireRoot('db')

/*
1 -- 待发布
2 -- 待分配
3 -- 待报价
4 -- 报价待待审核
5 -- 报价待确认
6 -- 待收款
7 -- 分房待确认
8 -- 待控房
9 -- 已控房
*/

const WAIT_FOR_PUBLISH = 1;         //待发布
const WAIT_FOR_DISPATCH = 2;        //待分配
const WAIT_FOR_GIVE_PRICE = 3;      //待报价
const WAIT_FOR_PRICE_CHECK = 4;     //报价待审核
const WAIT_FOR_PRICE_CONFIRM = 5;   //报价待确认
const WAIT_FOR_GATHERING = 6;       //待收款
const WAIT_FOR_ROOM_PERSON = 7;     //分房待确认
const WAIT_FOR_BOOKING = 8;         //待控房
const ORDER_RESOLVE = 9;            //已控房


module.exports = class BaseOfflineOrder{
    async $getCollection(){
        const db = await dbclient.get();
        return await db.collection('offline_order');
    }
    $createTime(){
        return new Date().format('YYYY-MM-DD hh:mm:ss');
    }
    async $insert(order){
        const collection = await this.$getCollection();
        const today = new Date().format('YYMMDD');
        const idReg = new RegExp(`^T${today}`);
        const maxIdResult = await collection.find({_id: idReg}, {_id: 1}).sort({ _id: -1 }).next();

        const date = this.$createTime();

        const nextId = maxIdResult ? `T${today}${ 
            (parseInt(maxIdResult._id.substr(today.length+1)) + 1).toString().padStart(3, '0')
        }` : `T${today}001`;

        await collection.insertOne(Object.assign(order, {
            _id: nextId,
            create_time: date,
            last_update:date
        }));

        return nextId;
    }
    async $update(query, update){
        const collection = await this.$getCollection();
        if(!update.$set) update.$set = {};
        update.$set.last_update = this.$createTime();
        const result = await collection.updateOne(query, update);
        if(result.modifiedCount===1) return true;

        return false;
    }
}