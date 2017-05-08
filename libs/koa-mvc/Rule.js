
const paramReg = /^\{\{([a-z0-9]+)(:([a-z0-9]+))?\}\}$/;

module.exports = class Rule {
    //_string : {{controller:home}}
    //_part
    //_minlength
    constructor(rule){
        rule = rule.replace(/\s/g, '').toLowerCase();
        this._string = rule;
        this._part = [];
        const segments = rule.split('/');
        for(let segment of segments){
            const match = segment.match(paramReg);
            if(match){
                this._part.push({
                    type: 'param',
                    key: match[1],
                    default: match[3]
                })
            }else{
                this._part.push({
                    type: 'text',
                    value: segment
                });
            }
        }
        this._minlength = this._part.length;
        for(let i = this._part.length-1; i>=0; --i){
            if(this._part[i].default) this._minlength--;
            else break;
        }
    }
    match(path){
        path = path.replace(/\s/g, '').toLowerCase();
        const segments = path.split('/');
        if(segments.length < this._minlength || segments.length > this._part.length){
            return null;
        }
        
        const result = {};

        for(let i = 0; i < this._part.length; ++i){
            const p = this._part[i];
            const s = segments[i];

            switch(p.type){
                case 'text':
                    if(p.value!==s) return null;
                    break;
                case 'param':
                    result[p.key] = s||p.default;
                    break;
            }
        }

        return result;
    }
    resolve(params){
        const segments = [];
        for(let p of this._part){
            switch(p.type){
                case 'text':
                    segments.push(p.value);
                    break;
                case 'param':
                    segments.push(params[p.key]||p.default);
                    break;
            }
        }
        return segments.join('/');
    }
}