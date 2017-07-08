const numberMap = '一二三四五六七八九十'.split('');
const currency = {
    EUR: '€',
    CNY: '¥',
    GBP: '￡'
}

module.exports = class Price{
    getModel(order, index){
        const prices = [];

        const stay_details = order.requirement.stay_details;
        const selectCase = order.price.cases[index];

        for(let i=0; i<stay_details.length; ++i){
            const blockDetail = stay_details[i];

            const rooms = [];

            for(let j=0; j<blockDetail.rooms.length; ++j){
                let types = [ { name: blockDetail.rooms[j].type, num: blockDetail.rooms[j].number } ];
                const actual_room_name = selectCase.price[i].rooms[j].actual_room_name;
                if(actual_room_name&&actual_room_name.length>0){
                    types = actual_room_name.map(r=>( { name: r.name, num: r.number } ))
                }
                rooms.push({ 
                    number: blockDetail.rooms[j].number,
                    types,
                    price: selectCase.price[i].rooms[j].price
                });
            }

            prices.push({
                city: blockDetail.city.name,
                hotel: selectCase.price[i].hotel.name,
                star: selectCase.price[i].hotel.star,
                score: selectCase.price[i].hotel.score,
                check_in: new Date(blockDetail.check_in).format('YYYY年M月D日'),
                check_out: new Date(blockDetail.check_out).format('YYYY年M月D日'),
                daySpan: new Date(blockDetail.check_in).daySpan(new Date(blockDetail.check_out)),
                rooms
            });
        }

        let total = 0;
        let bkTotal = 0;
        for(let price of prices){
            Object.assign(price, price.rooms.reduce((p, c)=>{
                return {
                    total: p.total+c.number*c.price.quoted*price.daySpan,
                    bkTotal: p.bkTotal+c.number*c.price.bk*price.daySpan
                }
            }, { total:0, bkTotal:0 }));
            total+=price.total;
            bkTotal+=price.bkTotal;
        }

        return {
            title: `${order.requirement.user.name}的报价${numberMap[index]}`,
            currency: currency[order.requirement.currency],
            prices,
            total,
            bkTotal,
            userPolicy: selectCase.user_policy||{}
        };
    }
}