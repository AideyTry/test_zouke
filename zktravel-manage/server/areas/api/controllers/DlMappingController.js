const LController = requireRoot('common/LController');
const DLMapping = requireRoot('service/mapping/DLMapping');


module.exports = class DlMappingController extends LController {
    async query(){
        const mapping = new DLMapping();
        const list = await mapping.query();
        this.renderJSON({code:0, list});
    }
    async map(){
        const { spId, zkId } = this.request.body;
        const mapping = new DLMapping();
        const result = await mapping.map(spId, zkId);
        if(result) this.renderJSON({ code:0 });
        else this.renderJSON({ code:1, msg: 'sp hotel not found' })
    }
}