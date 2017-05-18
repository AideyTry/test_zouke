require('../requireRoot');
require('@local/common/core/w/prototype');

const fs = require('fs');
const path = require('path');

function readAllTestModule(dir){
    const root = path.resolve(__dirname, dir);

    const m = [];

    const fsList = fs.readdirSync(root);
    
    for(let name of fsList){
        if(name==='index.js') continue;

        const p = path.resolve(root, name);
        if(fs.statSync(p).isFile()){
            m.push({ name, test: require(p) });
        }
    }
    return m;
}


async function run(){
    for(let m of readAllTestModule('./')){
        let result = m.test();
        if(result.then) result = await result;
        result = result || 'ok';
        console.log(`  ${m.name}: ${result}`);
    }
}

console.log('start test:');
run().then(()=>{
    console.log('test pass');
}).catch(e=>{
    console.log('test fail');
    console.error(e);
})