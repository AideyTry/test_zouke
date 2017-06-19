import DashBoardPage from './DashBoard.Page';
import HomeRoute from './home/routes';
import hotelMappingRoute from './hotelMapping/routes';
import zkhotelRoute from './zkhotel/routes';
import systemOrder from './system-order/routes';
import groupOrder from  './group-order/routes';
import publishRequire from './publish-require/routes';
import myPublish from  './my-publish/routes';
import waitExamine from './groupOffer/waitExamine/routes';
import waitOffer from './groupOffer/waitOffer/routes';
import distributed from './distributed/routes';
import orderDetail from './order-details/routers'
export default [
    {
        path: 'dashboard', component: DashBoardPage, name: 'dashboard',redirect: { name: 'dashboard-my-home' },
        children:[
            ...HomeRoute,
            ...hotelMappingRoute,
            ...zkhotelRoute,
            ...systemOrder,
            ...groupOrder,
            ...publishRequire,
            ...myPublish,
            ...waitExamine,
            ...waitOffer,
            ...distributed,
            ...orderDetail
        ]
    }
]