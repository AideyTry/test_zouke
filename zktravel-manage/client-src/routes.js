import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './common/Index';


import store  from './stores'
import routeStock from './hotel/stock/routes';
import routeSAI from './hotel/SAI/routes';
import Login    from './common/Login'
Vue.use(VueRouter);


const router=new VueRouter({
    routes: [
        {
            path: '/index',
            component: Index,
            meta:{
                requireAuth:true
            },
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
router.beforeEach((to,from,next)=>{
        
        if(to.matched.some(r=>r.meta.requireAuth)){
            if(store.state.token===200){
                 
                next();

            }
            else{
                next({
                    path:'/login',
                    // query:{
                    //     redirect:to.fullPath
                    // }

                });
            }
        }
        else{
            next();
        }
    })
export default router;