
const fs = require('fs');
const path = require('path');
const pug = require('pug');

function readJSON(p){
    return JSON.parse(fs.readFileSync(p, 'utf8'));
}

module.exports = ctx => {
    const vendorStats = readJSON(path.resolve(__dirname, '../.manifest/vendor.stats.json'))
    const mainStats = readJSON(path.resolve(__dirname, '../.manifest/main.stats.json'));

    const vendorPath = vendorStats.publicPath + vendorStats.assetsByChunkName.vendor;
    const mainPath = mainStats.publicPath + mainStats.assetsByChunkName.main;

    ctx.body = pug.compileFile(path.resolve(__dirname, './app.pug'),{
        cache: true,
        doctype: 'html'
    })({
        vendor: vendorPath,
        main: mainPath
    });
}