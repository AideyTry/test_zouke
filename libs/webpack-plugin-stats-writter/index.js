
const fs = require('fs');

module.exports = class StatsWritter{
    constructor(path,options){
        this.path = path;
        this.options = Object.assign({
            source:false,
            modules:false,
            children:false,
            chunks:false
        },options);
    }
    apply(compiler){
        compiler.plugin('emit',(compilation,done)=>{
            fs.writeFileSync(this.path,JSON.stringify(compilation.getStats().toJson(this.options)),'utf8');
            done();
        })
    }
}