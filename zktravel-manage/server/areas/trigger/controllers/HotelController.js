const Controller = require('@local/koa-mvc/Controller');

const LogicHotel = require('../logic/Hotel');

module.exports = class HotelController extends Controller{
    async refresh(){
        const hotel = new LogicHotel();
        hotel.autoMap();  
        this.renderJson({code: 0});
    }
}