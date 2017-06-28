function getValueType(value){
    if(value instanceof Date) return 'date';
    if(value instanceof RegExp) return 'regexp';
    if(Array.isArray(value)) return 'array';
    return typeof value;
}

function isEmptyValue(value){
    if(value===undefined&&value===null) return true;
    if(value!==value/*NaN*/) return true;
    if(value.trim&&value.trim()==='') return true;

    return false;
}

module.exports = function compare (example, data, options = {}){
    const { requirePrefix = '*', filter = false, strict = false } = options;

    const exampleType = getValueType(example);
    const dataType = getValueType(data);

    //字符串与数字互转
    if(!strict){
        if(exampleType==='string'&&dataType==='number') return String(data);
        if(exampleType==='number'&&dataType==='string'){
            const transResult = Number(data);
            if(isNaN(transResult)) return null;
            else return transResult;
        }
    }

    if(exampleType==='function'){
        switch(example.name){
            case 'trans':   //trans data
                return example(data, options);
            case 'noop':    //value type
                break;
            default:    //check
                return example(data)?data:null;
        }
    }

    if(exampleType!==dataType) return null;

    if(['number', 'boolean', 'string', 'date', 'regexp', 'undefined', 'function'].includes(exampleType)) return data;

    if(exampleType==='array'){
        const l = [];
        const [ exampleData, options = {} ] = example;
        if(options.min&&data.length<options.min) return null;
        if(options.max&&data.length>options.max) return null;

        if(!exampleData) return data;
        for(let d of data){
            const result = compare( exampleData, d, options );
            if(result===null) return null;
            l.push(result);
        }

        return l;
    }

    if(data===null) return null;

    data = Object.assign({}, data);

    const d = {};
    for(let field of Object.keys(example)){
        const exampleValue = example[field];
        const isRequire = field.startsWith(requirePrefix);
        if(isRequire){
            field = field.substr(requirePrefix.length);
        }
        const dataValue = data[field];
        delete data[field];

        if(isRequire &&  isEmptyValue(dataValue)) return null;
        if(dataValue==undefined) continue;
        if(exampleValue==null) {
            d[field] = dataValue;
            continue;
        }

        const r = compare(exampleValue, dataValue, options);
        if(r===null) return null;
        d[field] = r;
    }

    if(!filter) Object.assign(d, data);
    return d;
}