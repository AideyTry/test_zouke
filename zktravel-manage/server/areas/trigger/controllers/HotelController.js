const Controller = require('@local/koa-mvc/Controller');

const LogicHotel = require('../logic/Hotel');

module.exports = class HotelController extends Controller{
    async refresh(){
        const hotel = new LogicHotel();
        this.renderJSON({code: 0});
        hotel.autoMap();
    }
}