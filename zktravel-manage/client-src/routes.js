import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './common/Index';
//import Xid from './common/Xid';
//import Dlid from './hotel/stock/Dlid';
//import Mkid from './hotel/stock/Mkid';
//import Vtid from './hotel/stock/Vtid';

import store from './stores'
import routeStock from './hotel/stock/routes';
import routeSAI from './hotel/SAI/routes';


import ajax from '@local/common/ajax';

import Login from './common/Login'

Vue.use(VueRouter);

const router = new VueRouter({
	routes: [{
			path: '/index',
			component: Index,
			meta: {
				requireAuth: true
			},
			children: [

				...routeStock,
				...routeSAI

			]
		},
<<<<<<< HEAD
//		{
//			path: '/xid',
//			component: Xid,
//			children: [{
//					path: 'vtid',
//					component: Vtid,
//					name:'vtids'
//				},
//				{
//					path: 'mkid',
//					component: Mkid
//				},
//				{
//					path: 'dlid',
//					component: Dlid
//				}
//			]
//		},
		{
			path: '/',
			redirect: '/login',
=======
		{
			path: '/xid',
			component: Xid,
			children: [{
					path: 'vtid',
					component: Vtid,
					name:'vtids'
				},
				{
					path: 'mkid',
					component: Mkid
				},
				{
					path: 'dlid',
					component: Dlid
				}
			]
		},
		{
			path: '/',
			redirect: '/login',
>>>>>>> 32be46b66360f6c416f4d84f72d8ab7395e478fb
		},
		{
			path: '/login',
			component: Login
		}
	]

})
router.beforeEach((to, from, next) => {

	if(to.matched.some(r => r.meta.requireAuth)) {
		if(store.state.token === 200) {

			next();

		} else {
			next({
				path: '/login',
				// query:{
				//     redirect:to.fullPath
				// }

<<<<<<< HEAD
const router=new VueRouter({
    hashbang: true,
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
=======
			});
		}
	}
	else{
		next()
	}
})
>>>>>>> a21a477a9f284fa639cd1683d4329ba4cff1cfbb
export default router;