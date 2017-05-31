
//引入供应商组件start
import HotelMappingPage from './HotelMapping.Page'

//引入供应商组件end
export default [
    { 
        // path:'hotel-mapping', component: { render }, name: 'dashboard-hotel-mapping' ,
        path:'hotel-mapping/:provider',component:HotelMappingPage,name:'dashboard-hotel-mapping',
    }
]