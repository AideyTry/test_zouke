export default function assignRole(number) {
    let OFFLINE_ORDER= {
            PUBLISH: filter(1,number), //发布需求
            UPDATE_SELF_REQUIREMENT: filter(1<<1,number), //修改自己需求
            UPDATE_ALL_REQUIREMENT: filter(1<<2,number), //修改所有需求
            DISPATCH: filter(1<<3,number), //分配需求
            TOGGLE_VALID: filter(1<<4,number), //设置需求有效/无效

            FILL_PRICE: filter(1<<5,number), //填写报价
            APPLY_HISTORY_PRICE: filter(1<<6,number), //应用历史报价
            UPDATE_PRICE: filter(1<<7,number), //修改报价
            CHECK_PRICE: filter(1<<8,number), //审核报价
            CONFIRM_PRICE: filter(1<<9,number), //确定用户是否同意报价

            FILL_ORDER: filter(1<<10,number), //填写订单
            VIEW_SP_INFO: filter(1<<11,number), //查看订单供应商信息
            VIEW_USER_TERM: filter(1<<12,number), //查看订单用户条款
            UPDATE_ORDER: filter(1<<13,number), //修改订单
            EXPORT_VOUCHER: filter(1<<14,number), //导出voucher

            UPDATE_ROOM_PERSON: filter(1<<15,number), //填写分房名单
            GATHERING: filter(1<<16,number), //收款
            REFUND: filter(1<<17,number), //退款
    };
    function filter(code,number) {
       return (code&number)===code;
    }
    return OFFLINE_ORDER
}