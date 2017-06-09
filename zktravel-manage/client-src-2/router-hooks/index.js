import checkAuth from './before/checkAuth';
import activateStore from './before/activateStore';
import changeTitle from './after/changeTitle';
import assignRole from './before/assignRole'
export default {
    beforeHooks: [checkAuth, activateStore,assignRole],
    afterHooks: [changeTitle]
};