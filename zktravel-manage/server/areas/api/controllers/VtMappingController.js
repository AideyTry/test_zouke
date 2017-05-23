const LController = requireRoot('common/LController');
const VTMapping = requireRoot('service/mapping/VTMapping');


module.exports = class VtMappingController extends LController {
    async query(){
        const vtMapping = new VTMapping();
        const list = await vtMapping.query();
        this.renderJSON({code:0, list});
    }
}