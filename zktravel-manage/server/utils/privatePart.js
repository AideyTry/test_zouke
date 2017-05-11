module.exports = function privatePart(fnObj){
    const priRef = new WeakMap();

    return function(_this){
        if(_this instanceof Object){
            let priSet = priRef.get(_this);
            if(priSet) return priSet;

            priSet = {};
            if(fnObj){
                for (let [key,fn] of Object.entries(fnObj)){
                    if(typeof fn ==='function') {
                        priSet[key] = fn.bind(_this);
                    }else{
                        priSet[key]=fn;
                    }
                }
            }
            priRef.set(_this,priSet);
            return priSet;
        }
    }
}