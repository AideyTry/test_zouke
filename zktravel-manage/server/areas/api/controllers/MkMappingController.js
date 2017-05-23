const LController = requireRoot('common/LController');
const MKMapping = requireRoot('service/mapping/MKMapping');


module.exports = class MkMappingController extends LController {
    async query(){
        const mkMapping = new MKMapping();
        const list = await mkMapping.query();
        this.renderJSON({code:0, list});
    }
}