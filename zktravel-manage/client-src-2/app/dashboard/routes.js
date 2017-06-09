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
import distributed from './distributed/routes'
export default [
    {
        path: 'dashboard', component: DashBoardPage, name: 'dashboard',redirect: { name: 'dashboard-hotel-mapping' },
        children:[
            ...HomeRoute,
            ...hotelMappingRoute,
            ...zkhotelRoute,
            ...systemOrder,
            ...groupOrder,
            ...publishRequire,
            ...myPublish,
            ...waitExamine,
            ...waitOffer
            ...myPublish,
            ...distributed
        ]
    }
]