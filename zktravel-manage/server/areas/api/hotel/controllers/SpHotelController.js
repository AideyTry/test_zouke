const LController = requireRoot('common/LController');
const SpHotel = require('../@logic/SpHotel');

module.exports = class SpHotelController extends LController {
    async detail(id, sp){
        const spHotel = new SpHotel();
        const detail = await spHotel.detail(id, sp);
        this.renderJSON({code:0, detail});
    }
}