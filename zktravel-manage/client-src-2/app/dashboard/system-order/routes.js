import SysOrder from './SystemOrder.Page.vue'
export default [
    {
        path:'system-order-proxy',
        name:'dashboard-system-order-proxy',
        redirect:{name:"dashboard-system-order",params:{order:'effective'}}
    },
    {
        path:"system-order/:order",
        component:SysOrder,
        name:'dashboard-system-order'
    }
]
