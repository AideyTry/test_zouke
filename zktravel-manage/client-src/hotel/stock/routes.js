import Stock from './Stock';
import Mk from './MK';
import Dl from './Dl';
import Vt from './Vt';
import Bk from './Bk';
export default [{
    path: 'stock',
    component: Stock,
    children: [{
        path: 'mk',
        component:Mk
    },
    {
        path: 'dl',
        component:Dl
    },
    {
        path: 'vt',
        component:Vt
    },
    {
        path: 'bk',
        component:Bk
    }
    ]
}]
