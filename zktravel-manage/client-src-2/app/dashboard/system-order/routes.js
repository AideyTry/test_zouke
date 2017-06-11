import SysOrder from './SystemOrder.Page.vue'
export default [
    {
        path:'system-order-proxy',
        name:'dashboard-system-order-proxy',
        component:SysOrder
        // redirect:{name:"dashboard-system-order-proxy",params:{status:'effective'}}
    },
    // {path:'system-order/:status',component:SysOrder,name:'dashboard-system-order'}
]
