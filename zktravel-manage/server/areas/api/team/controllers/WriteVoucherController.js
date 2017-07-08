const TeamController = require('../TeamController');
const WriteVoucher = require('../@logic/WriteVoucher');

module.exports = class WriteVoucherController extends TeamController {

    $meta(){
        return {
            access: {
                'commit': {
                    'offline_order': [
                        this.P.OFFLINE_ORDER.MODIFY_INVOICE
                    ]
                }
            }
        }
    }

    //填写发票
    async commit(id,voucher_obj){
        const writeVoucher = new WriteVoucher();
        let user = this.$getUser();

        voucher_obj = writeVoucher.validVoucherObj(voucher_obj);

        if(!voucher_obj){
            return this.renderJSON({ code:1, msg: 'data check valid fail' });
        }
        const result = await writeVoucher.commit(id,user,voucher_obj);

        if(!result){
            return this.renderJSON({ code:2, msg:'can not modify voucher' });
        }
        this.renderJSON({code:0});
    }
};