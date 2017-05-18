const VTMapping = requireRoot('service/mapping/VTMapping');
const MKMapping = requireRoot('service/mapping/MKMapping');
const DLMapping = requireRoot('service/mapping/DLMapping');
const Pretreatment = requireRoot('service/mapping/Pretreatment');

module.exports = class Hotel {
    async autoMap(){
        console.log('before autoMap: data pretreatment');
        await (new Pretreatment()).run();
        console.log('before autoMap: data pretreatmented');
        console.log('autoMap start');
        console.log('  vt autoMap start');
        await (new VTMapping()).autoMap();
        console.log('  vt autoMap end');
        console.log('  mk autoMap start');
        await (new MKMapping()).autoMap();
        console.log('  mk autoMap end');
        console.log('  dl autoMap start');
        await (new DLMapping()).autoMap();
        console.log('  dl autoMap end');
        console.log('autoMap end');
    }
}