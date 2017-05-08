
const Rule = require('./Rule');
const Route = require('./Route');
const p = require('path');

module.exports = class Router{
    //_rules
    //_areas
    get rules(){
        return this._rules;
    }
    get areas(){
        return this._areas;
    }
    constructor({ 
        rules = [],
        areas = []
    } = {}){
        if(rules.length===0){
            rules.push('{{controller:home}}/{{action:index}}')
        }
        this._areas = areas;
        this._rules = [];
        for(let rule of rules){
            this._rules.push(new Rule(rule));
        }
    }

    _getMatchedResult(path){
        for(let rule of this.rules){
            const result = rule.match(path);
            if(result) return result;
        }
        return null;
    }

    match(path){
        path = p.relative('/', path);
        let area = '';
        let areaPath = '';
        for(let areaName of this.areas){
            if(path.startsWith(areaName)){
                area = areaName;
                areaPath = p.relative(areaName, path);
            }
        }

        if(area){
            const params = this._getMatchedResult(areaPath);
            if(params) return new Route(params, area);
        }

        const params = this._getMatchedResult(path);
        if(params) return new Route(params);

        return null;
    }
    resolve(params, area){
        return p.resolve('/' + area, this.rules[0].resolve(params));
    }
}