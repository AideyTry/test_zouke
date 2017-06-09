const LController = requireRoot('common/LController');
const City = require('../@logic/City');

module.exports = class CityController extends LController {
    async query(){
        const { keyword } = this.request.body;
        const city = new City();
        const list = await city.query(keyword);
        this.renderJSON({ code:0, list });
    }
}