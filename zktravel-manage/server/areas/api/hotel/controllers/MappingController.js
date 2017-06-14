const LController = requireRoot('common/LController');
const Mapping = requireRoot('service/mapping/Mapping');


module.exports = class MappingController extends LController {
    async query(sp, level){
        const mapping = new Mapping();
        const list = await mapping.query(sp, level);
        this.renderJSON({code:0, list});
    }
    async map(spId, zkId, sp){
        const mapping = new Mapping();
        const result = await mapping.map(zkId, spId, sp);
        this.renderJSON({ code: result });
    }
    async insert(spId, sp, sign){
        const mapping = new Mapping();
        const result = await mapping.insert(spId, sp, sign);
        this.renderJSON({ code: result });
    }
};