const LController = requireRoot('common/LController');
const SpHotel = require('../logic/SpHotel');

module.exports = class SpHotelController extends LController {
    async detail(){
        const {id, spId, sp} = this.request.body;
        const spHotel = new SpHotel();
        const detail = await spHotel.detail(id||spId, sp);
        this.renderJSON({code:0, detail});
    }
}