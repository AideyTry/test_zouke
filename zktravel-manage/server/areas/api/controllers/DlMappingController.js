const LController = requireRoot('common/LController');
const DLMapping = requireRoot('service/mapping/DLMapping');


module.exports = class DlMappingController extends LController {
    async query(){
        const dlMapping = new DLMapping();
        const list = await dlMapping.query();
        this.renderJSON({code:0, list});
    }
}