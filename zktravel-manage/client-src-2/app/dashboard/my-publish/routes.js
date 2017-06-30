import mypublish from './MyPublish.Page.vue'
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
    }
]