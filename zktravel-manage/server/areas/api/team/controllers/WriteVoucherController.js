const TeamController = require('../TeamController');
const WriteVoucher = require('../@logic/WriteVoucher');

module.exports = class WriteVoucherController extends TeamController {

    //约定许可证
    $meta(){
        return {
            access: {
                'commit': {
                    'offline_order': this.P.OFFLINE_ORDER.GATHERING
                }
            }
        }
    }

    //填写发票
    async commit(id,voucher_obj){
        const writeVoucher = new WriteVoucher();
        //拿到当前用户信息，更新表的时候做id校验
        let user = this.$getUser();
        /***
         * 进行业务逻辑之前，要根据业务需求来判断是否需要进行数据校验,不通过直接驳回请求。
         ****/
        voucher_obj = writeVoucher.validVoucherObj(voucher_obj);
        //表单信息校验失败
        if(!voucher_obj){
            return this.renderJSON({ code:1, msg: 'data check valid fail' });
        }
        const result = await writeVoucher.commit(id,user,voucher_obj);
        //数据库操作失败
        if(!result){
            return this.renderJSON({ code:2, msg:'can not commit voucher' });
        }
        //数据库操作成功
        this.renderJSON({code:0});
    }
};