const TeamController = require('../TeamController');
const { DEBUG } = requireRoot('env');

module.exports = class VoucherController extends TeamController {
    async download(){
        await this.renderRemote({ 
            host:DEBUG?'wx.test.zouke.com':'w.zouke.com', 
            path:'/zksystem/order/view-voucher',
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            data:{
                checkIn: '2017-06-30',
                checkOut: '2017-07-01',
                confirmNumber: '123',
                guestName: 'xxx',
                hotelAddress: 'address',
                hotelName: 'hotelName',
                hotelPhone: '0000',
                orderId: 'xxx',
                referentNo: 'rrr',
                roomList: [{ desc: '3 x Single', num: '3'}],
                roomNumbers: 1,
                hasBoard: true
            }
        })
    }
}