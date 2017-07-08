const BaseOrder = require('./BaseOrder');
const compare = require('@local/compare');

module.exports = class Voucher extends BaseOrder {

    //数据入库
    async download(orderId,orderIndex,hotelIndex,suppliersIndex){
        const collection = await this.$getCollection();
        const result = await collection.findOne({'_id':orderId}, {
            '_id': 1,
            'order_detail': 1,
            'requirement': 1
        });

        if(!result) return false;

        //拿到单个订单
        const order = result.order_detail.orders[orderIndex];
        let roomList = order.hotels[hotelIndex].suppliers[suppliersIndex].rooms;
        //房间数
        let roomNum = 0;
        //客人列表
        let guestName = '';
        //房间列表
        let roomDetail = [];

        for(let i=0; i < roomList.length; i++){
            roomNum  += roomList[i].number;

            let roomInfo = {
                "desc": roomList[i].number + " x " + roomList[i].type,
                "num": roomList[i].number
            };

            roomDetail.push(roomInfo);
            guestName += roomList[i].peoples.map(item=>(item.name || '') + (item.familyName || '')).join(',');

            if(i<roomList.length -1){
                guestName = guestName + ",";
            }
        }

        return {
            checkIn: new Date(order.check_in).format('dd/MM/YYYY'),
            checkOut: new Date(order.check_out).format('dd/MM/YYYY'),
            confirmNumber: order.hotels[hotelIndex].suppliers[suppliersIndex].at_number,
            guestName: guestName,
            hotelAddress: '暂无',
            hotelName: order.hotels[hotelIndex].hotel.name,
            hotelPhone: '暂无',
            orderId: result._id,
            referentNo: order.hotels[hotelIndex].remark_confirm,
            roomList: roomDetail,
            roomNumbers: roomNum,
            hasBoard: result.requirement.breakfast
        }
    }
};