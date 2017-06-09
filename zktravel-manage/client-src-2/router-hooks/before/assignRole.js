import store from 'root/store';
export default function assignRole(to, from, next) {
    let role = {
        PUBLISH: false, //发布需求
        UPDATE_SELF_REQUIREMENT: false, //修改自己需求
        UPDATE_ALL_REQUIREMENT: false, //修改所有需求
        DISPATCH: false, //分配需求
        TOGGLE_VALID: false, //设置需求有效/无效

        FILL_PRICE: false, //填写报价
        APPLY_HISTORY_PRICE: false, //应用历史报价
        UPDATE_PRICE: false, //修改报价
        CHECK_PRICE: false, //审核报价
        CONFIRM_PRICE: false,//确定用户是否同意报价

        FILL_ORDER: false, //填写订单
        VIEW_SP_INFO: false, //查看订单供应商信息
        VIEW_USER_TERM: false, //查看订单用户条款
        UPDATE_ORDER: false, //修改订单
        EXPORT_VOUCHER: false, //导出voucher

        UPDATE_ROOM_PERSON: false, //填写分房名单
        GATHERING: false, //收款
        REFUND: false, //退款
    };
    let rolecode = store.getters.userInfo.p.offline_order.toString(2);
    let roleArr = rolecode.split('');
    let keyArr = [];

    for (let k in role) {
        keyArr.push(k)
    }
    for (let a = 0; a < roleArr.length; a++) {
        if (roleArr[a] === '1') {
            role[keyArr[a]] = true;
        } else {
            role[keyArr[a]] = false;
        }
    }
    store.commit('initRole',role);
    next();
}