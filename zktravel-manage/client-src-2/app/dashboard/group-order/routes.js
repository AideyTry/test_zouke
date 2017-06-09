import GroupOrder from './GroupOder.Page'
export default [
    {
        path:'group-order-proxy',
        name:'dashboard-group-order-proxy',
        redirect:{name:"dashboard-group-order-proxy",params:{status:'effective'}}
    },
    {
        path:'group-order/:status',
        component:GroupOrder,
        name:'dashboard-group-order'
    }
]