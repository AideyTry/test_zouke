function getValueType(value){
    if(value instanceof Date) return 'date';
    if(value instanceof RegExp) return 'regexp';
    if(Array.isArray(value)) return 'array';
    return typeof value;
}

function isEmptyValue(value){
    if(value===undefined||value===null) return true;
    if(value!==value/*NaN*/) return true;
    if(value.trim&&value.trim()==='') return true;

    return false;
}

let lastError = { error:0, field:'' };

function clearError(){
    lastError = { error:0, field:'' };
}
function setError(error, field){
    lastError = { error, field };
}
function appendField(fix){
    lastError.field = lastError.field ? `${fix}.${lastError.field}`: fix;
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
            if(isNaN(transResult)){
                setError(2, '');
                return null;
            }
            else return transResult;
        }
    }

    if(exampleType==='function'&&example.length!==0/* fn value type */){
        let result;
        switch(example.name){
            case 'trans':   //trans data
                result = example(data, options);
                if(result===null){
                    setError(4, '');
                }
                return result;
            default:    //check
                result = example(data)?data:null;
                if(result) return data;
                else{
                    setError(4, '');
                    return null;
                }
        }
    }

    if(exampleType!==dataType){
        setError(2, '');
        return null
    }

    if(['number', 'boolean', 'string', 'date', 'regexp', 'undefined', 'function'].includes(exampleType)) return data;

    if(exampleType==='array'){
        const l = [];
        const [ exampleData, arrayOptions = {} ] = example;
        if(
            (arrayOptions.min && data.length<arrayOptions.min)||
            (arrayOptions.max && data.length>arrayOptions.max)
        ){
            setError(3, '');
            return null;
        }

        if(!exampleData) return data;
        for(let i=0; i<data.length; ++i){
            const result = compare( exampleData, data[i], options );
            if(result===null){
                appendField(i);
                return null;
            }
            l.push(result);
        }

        return l;
    }

    if(data===null){
        setError(5, '');
        return null;
    }

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

        if(isRequire &&  isEmptyValue(dataValue)){
            setError(1, field);
            return null;
        }
        if(dataValue==undefined) continue;
        if(exampleValue==null) {
            d[field] = dataValue;
            continue;
        }

        const r = compare(exampleValue, dataValue, options);
        if(r===null){
            appendField(field);
            return null;
        }
        d[field] = r;
    }

    if(!filter) Object.assign(d, data);
    return d;
};


/*
 * error:
 *  0: ok
 *  1: require
 *  2: type error
 *  3: array range
 *  4: function valid error
 *  5: data null
 */

module.exports.getLastError = function(){
    return lastError;
}