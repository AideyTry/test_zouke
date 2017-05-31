
const md5 = require('md5');
const fs = require('fs');

module.exports = class Md5Hash{
    constructor(version=''){
        this._version = version;
    }
    getChunkFileDependence(chunk){
        const pathSet = new Set();
        const deps = [];
        for(let module of chunk.modules){
            if('resource' in module) { //NormalModule
                pathSet.add(module.resource);
            }else if('sourceRequest' in module){ //DelegatedModule
                deps.push({type:'delegate',sourceRequest:module.sourceRequest,request:module.request})
            }else if('request' in module){ //ExternalModule
                deps.push({type:'external',request:module.request})
            }
        }
        const pathDeps = [...pathSet].map(p=>{
        return {type:'normal',path:p}
        });
        return [...pathDeps,...deps];
    }
    _stringify(dep){
        switch(dep.type){
            case 'normal':
                return 'normal:'+dep.path;
            case 'delegate':
                return 'delegate:'+dep.sourceRequest+','+dep.request;
            case 'external':
                return 'external:'+dep.request;
        }
    }
    apply(compiler){
        compiler.plugin("compilation", compilation=> {
            compilation.plugin("chunk-hash", (chunk, chunkHash) => {

                const depList = this.getChunkFileDependence(chunk).sort((a,b)=>{
                    a = this._stringify(a);
                    b = this._stringify(b);
                    if(a>b) return 1;
                    else if(a<b) return -1;
                    else return 0;
                });
                //debug
                //console.log(depList);
                
                const chunk_hash = md5(depList.map(
                    dep=>{
                        switch(dep.type){
                            case 'normal':
                                return fs.readFileSync(dep.path).toString();
                            case 'delegate':
                                return dep.sourceRequest+','+dep.request;
                            case 'external':
                                return dep.request;
                        }

                    }).join('\n')+this._version);
                chunkHash.digest = function () {
                    return chunk_hash;
                };
            });
        });
    }
}