
const path = require('path');

function upperFirstLetter(s){
    if(s.length>=1){
        return s.slice(0, 1).toUpperCase() + s.slice(1);
    }

    return s;
}

function camelCase(s){
    const segs = s.split('-');
    for(let i = 1; i < segs.length; ++i){
        segs[i] = upperFirstLetter(segs[i]);
    }
    return segs.join('');
}

module.exports.upperFirstLetter = upperFirstLetter;
module.exports.camelCase = camelCase;

const appRoot = path.dirname(require.main.filename);

Object.defineProperty(module.exports, 'appRoot', {
    value: appRoot
});