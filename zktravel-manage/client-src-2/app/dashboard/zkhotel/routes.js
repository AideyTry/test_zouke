
import ZkhotelPage from './Zkhotel.Page'

export default [
    {
        path:'zkhotel-proxy',name:'dashboard-zkhotel-proxy',redirect:{name:'dashboard-zkhotel',params:{status:'unexamine'}},
    },
    {
        path:'zkhotel/:status', component: ZkhotelPage,name:'dashboard-zkhotel'
	}
]