const LController = requireRoot('common/LController');
const DES = require('@local/des');
const { DES_PWD } = requireRoot('env');
const Order = require('../@logic/Order');
const Price = require('../@logic/Price');

module.exports = class TeamController extends LController {
    async price(id, cuid, sign, index){
        const des = new DES(DES_PWD);
        if(des.encrypt(id+cuid+index) !== sign){
            this.render(null, 'price.error');
        }
        const order = new Order();
        const price = new Price();

        const detail = await order.get(id);

        cuid = parseInt(cuid, 10);
        const uid = await this.$getUid();
        
        if((detail&&detail.requirement.user.id===uid&&detail.price&&detail.price.cases[index])||cuid===uid){
            this.render(price.getModel(detail, index));
        }else{
            this.render(null, 'price.error');
        }
    }
}