import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import hooks from './router-hooks';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes
});

for(let hook of hooks.beforeHooks){
    router.beforeEach(hook);
}

for(let hook of hooks.afterHooks){
    router.afterEach(hook);
}

export default router;