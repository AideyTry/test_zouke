import myHome from './Home.Page.vue';
export default [
    {
        path:"my-home",
        name:"dashboard-my-home-proxy",
        redirect:{name:"dashboard-my-home"}
    },
    {
        path:"my-home",
        name:"dashboard-my-home",
        component:myHome
    }
]