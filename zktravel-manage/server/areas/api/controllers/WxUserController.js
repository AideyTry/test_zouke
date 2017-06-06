const LController = requireRoot('common/LController');
const WxUser = require('../logic/WxUser');

module.exports = class WxUserController extends LController {
    async query(){
        const { page=0, pageSize=10, keyword } = this.request.body;
        const wxUser = new WxUser();
        const result = await wxUser.query(page, pageSize, keyword);
        return this.renderJSON(Object.assign({code: 0}, result));
    }
}