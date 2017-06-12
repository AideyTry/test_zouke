const LController = requireRoot('common/LController');
const User = require('../@logic/User');

module.exports = class UserController extends LController {
    async query(){
        const { page=0, pageSize=10, keyword } = this.request.body;
        const user = new User();
        const result = await user.query(page, pageSize, keyword);
        return this.renderJSON(Object.assign({code: 0}, result));
    }
    async search(){
        const { keyword } = this.request.body;
        const user = new User();
        const { list } = await User.query(0, 10, keyword);

        return this.renderJSON({ code:0, list: list.map(c=>({
            id: c._id,
            name: c.nick_name,
            avatar: c.head_image
        })) });
    }
}