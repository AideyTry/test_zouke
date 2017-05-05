
const Koa = require('koa');
const pug = require('pug');
const fs = require('fs');
const path = require('path');

function readJSON(path){
    return JSON.parse(fs.readFileSync(path, 'utf8'));
}

const app = new Koa();
app.use(ctx => {
    const vendorStats = readJSON(path.resolve(__dirname, '../.manifest/vendor.stats.json'))
    const mainStats = readJSON(path.resolve(__dirname, '../.manifest/main.stats.json'));

    const vendorPath = vendorStats.publicPath + vendorStats.assetsByChunkName.vendor;
    const mainPath = mainStats.publicPath + mainStats.assetsByChunkName.main;

    ctx.body = pug.compileFile(path.resolve(__dirname, './app.pug'))({
        vendor: vendorPath,
        main: mainPath
    });
});
app.listen(8081);