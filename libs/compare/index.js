function getValueType(value){
    if(value instanceof Date) return 'date';
    if(value instanceof RegExp) return 'regexp';
    if(Array.isArray(value)) return 'array';
    return typeof value;
}


module.exports = function compare (example, data, { requirePrefix = '*', filter = true } = {}){
    const exampleType = getValueType(example);
    const dataType = getValueType(data);
    if(exampleType!==dataType) return null;

    if(['number', 'boolean', 'string', 'date', 'regexp', 'undefined', 'function'].includes(exampleType)) return data;

    if(exampleType==='array'){
        const l = [];
        const [ exampleData, options = {} ] = example;
        if(options.min&&data.length<options.min) return null;
        if(options.max&&data.length>options.max) return null;

        if(!exampleData) return data;
        for(let d of data){
            const result = compare( exampleData, d, { requirePrefix, filter } );
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

        if(isRequire && dataValue==null) return null;
        if(exampleValue==null) {
            d[field] = dataValue;
            continue;
        }

        const r = compare(exampleValue, dataValue, { requirePrefix, filter });
        if(r===null) return null;
        d[field] = r;
    }

    if(!filter) Object.assign(d, data);
    return d;
}