import GroupOrder from './GroupOder.Page.vue'
export default [
    {
        path:'group-order-proxy',
        name:'dashboard-group-order-proxy',
        redirect:{name:"dashboard-group-order-proxy",params:{order:'effective'}}
    },
    {
        path:'group-order/:order',
        component:GroupOrder,
        name:'dashboard-group-order'
    }
]