import render from 'root/RouterView.Render';

import ZkhotelPage from './Zkhotel.Page'
export default [
    { 
        // path:'zkhotel', component: { render }, name: 'dashboard-zkhotel' ,
        path:'zkhotel', component: ZkhotelPage,name:'dashboard-zkhotel',
        children: []
    }
]