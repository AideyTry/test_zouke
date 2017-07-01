const TeamController = require('../TeamController');
const { DEBUG } = requireRoot('env');
const Voucher = require('../@logic/Voucher');


module.exports = class VoucherController extends TeamController {
    $meta(){
        return {
            access: {
                'download': {
                    'offline_order': this.P.OFFLINE_ORDER.EXPORT_VOUCHER
                },
                default: {
                    'offline_order': this.P.OFFLINE_ORDER.EXPORT_VOUCHER
                }
            }
        }
    }

    async toDownload(orderId,orderIndex=0,hotelIndex=0,suppliersIndex=0){
        const voucher = new Voucher();
        const voucherDetail = await voucher.download(orderId,orderIndex,hotelIndex,suppliersIndex);

        await this.renderRemote({
            host:DEBUG?'wx.test.zouke.com':'w.zouke.com',
            path:'/zksystem/order/view-voucher',
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            voucherDetail
        });
    }
};