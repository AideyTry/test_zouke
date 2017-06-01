const Controller = require('@local/koa-mvc/Controller');

const Mapping = requireRoot('service/mapping/Mapping');
const Pretreatment = requireRoot('service/mapping/Pretreatment');

async function refresh(){
    console.log('autoMap: data pretreatment');
    await (new Pretreatment()).run();
    console.log('autoMap: date pretreatmented');
    console.log('autoMap: start');
    await (new Mapping()).autoMap();
    console.log('autoMap: end');
}

module.exports = class HotelController extends Controller{
    async refresh(){
        this.renderJSON({code: 0});
        refresh();
    }
}