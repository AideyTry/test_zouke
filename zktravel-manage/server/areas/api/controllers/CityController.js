const LController = requireRoot('common/LController');
const City = require('../@logic/City');

module.exports = class CityController extends LController {
    async search(keyword){
        const city = new City();
        const list = (await city.query(keyword)).map(c=>({ id: c._id, name: c.name }));
        this.renderJSON({ code:0, list });
    }
}