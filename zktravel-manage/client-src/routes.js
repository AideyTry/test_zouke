import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './common/Index';


import store  from './stores'
import routeStock from './hotel/stock/routes';
import routeSAI from './hotel/SAI/routes';
import Login    from './common/Login'
import ajax from '@local/common/ajax';
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
        // {
        //     path: '/',
        //     redirect: '/index',
        // },
        {
            path:'/login',
            component:Login
        }
    ]
  
})

if(window.localStorage.getItem('token')){
    store.commit('login1',window.localStorage.getItem('token'))
}

router.beforeEach((to,from,next)=>{
    if(to.matched.some(r=>r.meta.requireAuth)){
        if(store.state.token!=0){
            next({
                path:'/login'
                // query:{
                //     redirect:to.fullPath
                // }
            });
         }
         else{
            next();
         }
     }
    else{
        next();
    }
})
        // })
        

       
    // })
export default router;