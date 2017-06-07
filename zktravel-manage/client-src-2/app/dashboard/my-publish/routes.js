import mypublish from './MyPublish.Page.vue'
export default [
    {path:'hotel-mapping-proxy',name:'dashboard-hotel-mapping-proxy',redirect:{name:'dashboard-my-publish',params:{status:'vt'}}},
    {path:'my-publish/:status',component:mypublish,name:'dashboard-my-publish'}
]