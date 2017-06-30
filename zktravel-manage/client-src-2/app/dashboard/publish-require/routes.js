import publish from './PublishRequire.Page.vue'
export default [
    {path:'publish-require-proxy',name:'dashboard-publish-require-proxy',redirect:{name:'dashboard-publish-require'}},
    {path:'publish-require',component:publish,name:'dashboard-publish-require'}
]