import checkAuth from './before/checkAuth';
import activateStore from './before/activateStore';
import changeTitle from './after/changeTitle';
export default {
    beforeHooks: [checkAuth, activateStore],
    afterHooks: [changeTitle]
};