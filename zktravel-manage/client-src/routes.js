import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './common/Index';



import routeStock from './hotel/stock/routes';
import routeSAI from './hotel/SAI/routes';
import Login    from './common/Login'
Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/index',
            component: Index,
            children:[
 
                ...routeStock,
                ...routeSAI
                
            ]
        },
        {
            path: '/',
            redirect: '/login',
        },
        {
            path:'/login',
            component:Login
        }
    ]
})
