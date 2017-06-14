const path = require('path');
const { upperFirstLetter, camelCase, parseMethodArgs } = require('./utils');
const Controller = require('./Controller');
const NotFoundError = require('./NotFoundError');

const cache = {};

function findControllerByPath(p){
    if(!cache[p]){
        try{
            cache[p] = require(p);
        }catch(e){
            if(e.message.startsWith('Cannot find module ')){
                cache[p] = new NotFoundError('controller not found');
            }
            cache[p] = e;
        }
    }

    const RouteController = cache[p];
    if(RouteController instanceof Error) throw RouteController;
    if(! RouteController.prototype instanceof Controller)
        throw new Error('required controller class is not drive from koa-mvc/Controller');
    
    return RouteController;
}

function parseArgs(fn){
    const args = parseMethodArgs(fn);
    return args.map(arg=>{
        const matchResult = /^\/\*\s*?param\s*?\:\s*?([\s\S]+?)\s*?\*\//.exec(arg);
        return matchResult?matchResult[1]:arg
    });
}

module.exports = class ActionTrigger{
    constructor({ctx, route, router}){
        this._ctx = ctx;
        this._route = route;
        this._router = router;

        this._controllerName = upperFirstLetter(camelCase(route.controller)) + 'Controller';
        this._actionName = camelCase(route.action);
    }
    build(){
        const RouteController = findControllerByPath(path.resolve(
            this._route.controllersRoot,
            this._controllerName
        ));

        this._controller = new RouteController({
            ctx: this._ctx,
            route: this._route,
            router: this._router
        });
    }
    async trigger(){
        if(!this._controller) this.build();

        const controller = this._controller;
        if(controller[this._actionName]){
            let result = await controller.$beforeAction();

            if(result!==false){
                const args = parseArgs(controller[this._actionName]).map(key=>controller.request.body[key]);
                const actionResult = await controller[this._actionName](...args);
            }
            await controller.$afterAction(); 
            
        } else throw new NotFoundError('action not found');
    }
}