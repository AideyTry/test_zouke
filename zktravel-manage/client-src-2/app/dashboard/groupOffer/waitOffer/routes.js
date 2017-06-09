import WaitOffer from './WaitOffer.Page.vue';
export default[
    {
        path:'wait-offer-proxy',
        name:'dashboard-wait-offer-proxy',
        redirect:{name:'dashboard-wait-offer',params:{offer:'wp'}}
    },
    {
        path:'wait-offer/:offer',
        name:'dashboard-wait-offer',
        component:WaitOffer
    }
]