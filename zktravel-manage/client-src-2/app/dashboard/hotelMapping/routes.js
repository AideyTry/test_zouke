import render from 'root/RouterView.Render';
//引入供应商组件start
import HotelMappingPage from './HotelMapping.Page'
import MkPage from './Mk.Page.vue';
import DlPage from './Dl.Page.vue';
import VtPage from './Vt.Page.vue';
import BkPage from './Bk.Page.vue';
//引入供应商组件end
export default [
    { 
        // path:'hotel-mapping', component: { render }, name: 'dashboard-hotel-mapping' ,
        path:'hotel-mapping',component:HotelMappingPage,mane:'dashboard-hotel-mapping',
        children: [
        	//增加mapping子路由代码start
        	{
        		path:'mk', component:  MkPage , name: 'dashboard-hotel-mapping-mk'
        	},
        	{
        		path:'dl', component: DlPage , name: 'dashboard-hotel-mapping-dl'
        	},
        	{
        		path:'vt', component: VtPage , name: 'dashboard-hotel-mapping-vt'
        	},
        	{
        		path:'bk', component: BkPage , name: 'dashboard-hotel-mapping-bk'
        	}
        	//增加mapping子路由代码end
        ]
    }
]