const LController = requireRoot('common/LController');
const SpHotel = require('../logic/SpHotel');

module.exports = class SpHotelController extends LController {
    async detail(){
        const params = this.request.body;
        const spHotel = new SpHotel();
        const detail = await spHotel.detail(params.id);
        this.renderJSON({code:0, detail});
    }
}