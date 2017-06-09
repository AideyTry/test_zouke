import WaitExamine from './WaitExamine.Page.vue';
export default [
    {
        path:'wait-examine',
        name:'dashboard-wait-examine-proxy',
        redirect:{name:'dashboard-wait-examine'}
    },
    {
        path:'wait-examine',
        name:'dashboard-wait-examine',
        component:WaitExamine
    }
]