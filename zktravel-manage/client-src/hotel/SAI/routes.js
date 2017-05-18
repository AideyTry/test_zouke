import SAI from './SAI';
import Pending from './Pending';
import Offline from './Offline.vue';
import Online from './Online.vue';

export default [{
    path: 'SAI',
    component: SAI,
    children: [{
        path: 'pending',
        component: Pending
    }, 
    {
        path: 'offline',
        component: Offline
    }, 
    {
        path:'online',
        component:Online
    }]
}]
