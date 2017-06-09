const LController = requireRoot('common/LController');
const ZkHotel = require('../@logic/ZkHotel');

module.exports = class ZkHotelController extends LController {
    async detail(){
        const params = this.request.body;
        const zkHotel = new ZkHotel();
        const detail = await zkHotel.detail(params.id);
        this.renderJSON({code:0, detail});
    }
    async query(){
        const { page=0, pageSize=10, status=0, keyword } = this.request.body;
        const zkHotel = new ZkHotel();
        const result = await zkHotel.query(page, pageSize, { status, keyword });

        this.renderJSON(Object.assign({code:0}, result))
    }
}