const TeamController = require('../TeamController');

module.exports = class VoucherController extends TeamController {
    async download(){
        await this.renderRemote({ host:'www.baidu.com', path:'/img/bd_logo1.png' })
    }
}