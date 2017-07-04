const LController = requireRoot('common/LController');
const ZkHotel = require('../@logic/ZkHotel');

module.exports = class ZkHotelController extends LController {
    async detail(){
        const params = this.request.body;
        const zkHotel = new ZkHotel();
        const detail = await zkHotel.detail(params.id);
        this.renderJSON({code:0, detail});
    }
    async query(page, pageSize, status=0, keyword){
        const zkHotel = new ZkHotel();
        const result = await zkHotel.query(page, pageSize, { status, keyword });

        this.renderJSON(Object.assign({code:0}, result))
    }
    async search(keyword, city){
        const zkHotel = new ZkHotel();
        const { list } = await zkHotel.query(0, 10, { keyword, city }, false);

        this.renderJSON({ code:0, list:list.map(h=>({
            id: h._id,
            name: h.name,
            ename: h.name_en,
            country: h.country_name||h.country_name_en,
            city: h.city_name||h.city_name_en||h.city,
            booking: h.url,
            score: h.score,
            phone: h.phone,
            address: h.address
        }))})
    }
}