import orderDetail from './OrderDetail.Page.vue'
export default [
    {
        path: 'order-detail/:orderid/:status',
        component: orderDetail,
        name: 'dashboard-order-detail'
    }
]