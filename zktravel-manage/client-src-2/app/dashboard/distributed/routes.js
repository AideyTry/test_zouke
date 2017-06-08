import distributed from './Distributed.Page'
export default [
    {
        path: 'distributed-proxy',
        name: 'dashboard-distributed-proxy',
        redirect: {name: 'dashboard-distributed'}
    },
    {   path: 'distributed',
        component: distributed,
        name: 'dashboard-distributed'}
]