import checkAuth from './before/checkAuth';
import changeTitle from './after/changeTitle';


export default {
    beforeHooks: [checkAuth],
    afterHooks: [changeTitle]
};