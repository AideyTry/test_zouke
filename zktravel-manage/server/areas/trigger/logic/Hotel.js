const VTMapping = requireRoot('service/mapping/VTMapping');
const MKMapping = requireRoot('service/mapping/MKMapping');
const DLMapping = requireRoot('service/mapping/DLMapping');

module.exports = class Hotel {
    async autoMap(){
        await (new VTMapping()).autoMap();
        await (new MKMapping()).autoMap();
        await (new DLMapping()).autoMap();
    }
}