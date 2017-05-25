import DashBoardPage from './DashBoard.Page';
import hotelMappingRoute from './hotelMapping/routes';
import zkhotelRoute from './zkhotel/routes';

export default [
    {
        path: 'dashboard', component: DashBoardPage, name: 'dashboard',
        /*
        meta: {
            store: { name:'app-dashboard', m(){ return { state: { test: 'abc' } }  }}
        },
        */
        children:[
            ...hotelMappingRoute,
            ...zkhotelRoute
        ]
    }
]