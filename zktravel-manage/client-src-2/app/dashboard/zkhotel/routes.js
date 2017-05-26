import render from 'root/RouterView.Render';

import ZkhotelPage from './Zkhotel.Page'
import PenddingPage from './Pendding.Page';
import OnlinePage from './Online.Page';
import OfflinePage from './Offline.Page';
export default [
    { 
        // path:'zkhotel', component: { render }, name: 'dashboard-zkhotel' ,
        /*添加的start*/ 
        path:'zkhotel', component: ZkhotelPage,name:'dashboard-zkhotel',
        children: [
       		{
       			path:'pendding', component: PenddingPage, name:'dashboard-zkhotel-pendding'
       		},
       		{
       			path:'online', component: OnlinePage, name:'dashboard-zkhotel-online'
       		},
       		{
       			path:'offline', component: OfflinePage,name:'dashboard-zkhotel-offline'
       		}
        ]
        /*添加的end*/ 
    }
]