const path = require('path');
const utils = require('./utils');
const Controller = require('./Controller');
const NotFoundError = require('./NotFoundError');

const cache = {};

function findControllerByPath(p){
    if(!cache[p]){
        try{
            cache[p] = require(p);
        }catch(e){
            cache[p] = new NotFoundError('controller not found');
        }
    }

    const RouteController = cache[p];
    if(RouteController instanceof Error) throw RouteController;
    if(! RouteController.prototype instanceof Controller)
        throw new Error('required controller class is not drive from koa-mvc/Controller');
    
    return RouteController;
}

module.exports = class ActionTrigger{
    constructor({ctx, route, router}){
        this._ctx = ctx;
        this._route = route;
        this._router = router;

        this._controllerName = utils.upperFirstLetter(utils.camelCase(route.controller)) + 'Controller';
        this._actionName = utils.camelCase(route.action);
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
            let result =true;
            if(controller.beforeAction){
                let result = controller.beforeAction();
                if(result instanceof Promise) result = await result;
            }

            if(result){
                const actionResult = controller[this._actionName]();
                if(actionResult instanceof Promise) await actionResult;
            }

            controller.afterAction&&controller.afterAction();
        } else throw new NotFoundError('action not found');
    }
}