const BaseOrder = require('./BaseOrder');
const compare = require('@local/compare');
const jsondiffpatch = require('jsondiffpatch');


const validReqDataRule = {
    '*priority': 'priority_level',
    '*origin_from':'from',
    '*user': {
        '*id': 1,
        '*name': 'name',
        '*avatar': 'img_url'
    },
    '*number': 3,
    '*start_date': '2017-07-07',
    '*star': 'star',
    '*breakfast': true,
    '*currency': 'EUR',
    '*budget_min': 200,
    '*budget_max': 1000,
    'budget_mark': 'mark',
    'cancel_req': 'cancel_req',
    'position_req': 'position_req',
    'other_req': 'other_req',
    '*stay_details': [
        {
            '*check_in': '2017-07-08',
            '*check_out': '2017-07-09',
            '*city': { '*code':123, '*name':'name' },
            'hotel': { '*name': '' },
            '*rooms': [
                { '*type': 'type', '*number': 1, 'mark': 'mark' },
                { min:1 }
            ]
        },
        { min:1 }
    ]
}

function patchPriceDiff(old_stay_details, stay_details, price){
    const newPrice = {
        last_update: price.last_update,
        requirement_change: true,
        cases: price.cases.map(p=>({ sp_policy: p.sp_policy, price: [] }))
    };

    const diff = [];
    for(let detail of stay_details){
        const sameDetailIndex = old_stay_details.findIndex(
            d=>{
                if(d._matched) return false;
                if(d.check_in!==detail.check_in) return false;
                if(d.check_out!==detail.check_out) return false;
                if(d.city.code!==detail.city.code) return false;

                const oldHotel = d.hotel||{ custom:true, name:'' };
                const hotel = detail.hotel||{ custom:true, name:'' };

                if(hotel.custom&&!hotel.name){
                    d._matched = true;
                    return true;
                }

                if(hotel.custom&&oldHotel.custom&&hotel.name===oldHotel.name){
                    d._matched = true;
                    return true;
                }

                if(hotel.id===oldHotel.id){
                    d._matched = true;
                    return true;
                }
                
                return false;
            }
        )
        if(sameDetailIndex===-1){
            diff.push(null);
            continue;
        }

        const detailDiffInfo = { from:sameDetailIndex, rooms:[] };

        const rooms = detail.rooms;
        const old_rooms = old_stay_details[sameDetailIndex].rooms;

        for(let room of rooms){
            const sameRoomIndex = old_rooms.findIndex(r=>{
                if(r._matched) return false;
                if(r.type===room.type){
                    r._matched = true;
                    return true;
                }
                return false;
            });
            if(sameRoomIndex===-1) detailDiffInfo.rooms.push(null);
            else detailDiffInfo.rooms.push({ from:sameRoomIndex });
        }

        diff.push(detailDiffInfo);
    }
    newPrice.cases = price.cases.map(c=>{
        const nc = {
            sp_policy:c.sp_policy,
            price: []
        };

        for(const diffDetail of diff){
            if(diffDetail === null){
                nc.price.push({ hotel:{}, rooms: []});
                continue;
            }
            const { from, rooms } = diffDetail;
            const p = c.price[from];
            const np = { hotel: p.hotel, rooms: [] };
            for(room of rooms){
                if(room===null){
                    np.rooms.push({});
                    continue;
                }
                np.rooms.push(p.rooms[room.from]);
            }
            nc.price.push(np);
        }

        return nc;
    });

    return newPrice;
}


module.exports = class TeamRequirement extends BaseOrder {
    async $insert(requirement, status, creator){
        requirement.last_update = this.$createTime();

        return await super.$insert({
            creator,
            status,
            requirement,
        });
    }
    validRequirement(data){
        return compare( validReqDataRule, data );
    }
    async publish(data, creator){
        return await this.$insert(data, this.status.WAIT_FOR_DISPATCH, creator);
    }
    async draft(data, creator){
        return await this.$insert(data, this.status.WAIT_FOR_PUBLISH, creator);
    }
    async draftPublish(id, requirement){
        const set = {
            status: this.status.WAIT_FOR_DISPATCH
        }
        if(requirement){
            requirement.last_update = this.$createTime();
            set.requirement = requirement;
        }
        return await this.$update({_id:id, status: this.status.WAIT_FOR_PUBLISH}, { $set: set });
    }
    async update(id, requirement, user/*更新者*/, all/*是否能更新所有需求*/){
        const collection = await this.$getCollection();
        
        const { 
            WAIT_FOR_PUBLISH,
            WAIT_FOR_DISPATCH, 
            WAIT_FOR_GIVE_PRICE, 
            WAIT_FOR_PRICE_CHECK,
            WAIT_FOR_PRICE_CONFIRM,
            WAIT_FOR_GATHERING
        } = this.status;

        const query = { _id: id, status: 
            {
                $in: [
                    WAIT_FOR_PUBLISH,
                    WAIT_FOR_DISPATCH, 
                    WAIT_FOR_GIVE_PRICE, 
                    WAIT_FOR_PRICE_CHECK,
                    WAIT_FOR_PRICE_CONFIRM,
                    WAIT_FOR_GATHERING
                ]
            }
        };
        const result = await collection.findOne(query, { status:1, requirement:1, creator:1, price:1 })
        if(!result) return -1 //已付款之后,无法更改需求
        const { status, requirement:_oldRequirement, creator, price } = result;


        if(!all&&creator.id!==user.id){
            return -2 //无权
        }

        const nowTime = this.$createTime();

        const updateQuery = {
            _id: id,
            status
        };
        const update = {
            $set: { requirement }
        };
        /*
        if(price_history&&price_history.length>0){
            updateQuery['price_history.disable_apply'] = { $in: [ null, true, false ] };
            update.$set['price_history.$.disable_apply'] = true;
        }
        */
        if(status !== WAIT_FOR_PUBLISH && status !== WAIT_FOR_DISPATCH){
            update.$set.status = WAIT_FOR_GIVE_PRICE;
            delete _oldRequirement.last_update;
            const diff = jsondiffpatch.diff(_oldRequirement, requirement);
            update.$push = { logs: this.$createShiftUpdate({ type: 'system:update-requirement', time: nowTime, diff, user }) };

            if(price){
                update.$set.price = patchPriceDiff(_oldRequirement.stay_details, requirement.stay_details, price);
            }
        }

        requirement.last_update = nowTime;

        return await this.$update(updateQuery, update)
    }
}