import mypublish from './MyPublish.Page.vue'
import orderDetail from './OrderDetail.Page.vue'
export default [
    {
        path: 'my-publish-proxy',
        name: 'dashboard-my-publish-proxy',
        redirect: {name: 'dashboard-my-publish', params: {status: 'wait-publish'}}
    },
    {
        path: 'my-publish/:status',
        component: mypublish,
        name: 'dashboard-my-publish',
    },
    {
        path: 'order-detail',
        component: orderDetail,
        name: 'dashboard-order-detail'
    }
]