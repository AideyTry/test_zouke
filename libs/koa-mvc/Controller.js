
const pug = require('pug');
const path = require('path');
const ActionTrigger = require('./ActionTrigger');
const Route = require('./Route');

const pugCompileOptions = {
    cache: true,
    doctype: 'html'
}

module.exports = class Controller {
    constructor({ctx, route, router}){
        Object.defineProperties(this, {
            ctx: { value: ctx },
            route: { value: route },
            router: { value: router }
        });
        this.layout = '~layout';
    }

    render(model = {}, view){
        const controller = this.route.controller;
        view = view || this.route.action;

        const viewPath = path.resolve(this.route.viewsRoot, `${controller}/${view}.pug`);
        const content = pug.compileFile(viewPath, pugCompileOptions)({
            model
        });

        if(this.layout){
            const layoutPath = path.resolve(this.route.viewsRoot, `${this.layout}.pug`);
            const body = pug.compileFile(layoutPath, pugCompileOptions)({
                model,
                content
            });
            this.ctx.body = body;
        }else{
            this.ctx.body = content;
        }
    }
    renderJson(json = {}){
        this.ctx.body = json;
    }
    redirect(params, area){
        const url = (typeof params === 'string') ? params : this.router.resolve(params, area);
        this.ctx.redirect(url);
    }
    async rewrite(params, area){
        const route = new Route(params, area);
        const actionTrigger = new ActionTrigger({
            ctx: this.ctx,
            route,
            router: this.router
        });
        await actionTrigger.trigger();
    }
}