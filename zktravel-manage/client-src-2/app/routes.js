import LoginPage from './Login.Page';
import dashboardRoutes from './dashboard/routes';
import fullpageRoutes from './fullpage/routes';


export default [
    {
        path: 'login', component: LoginPage, name: 'login',
        meta: {
            title: '登录',
            auth: false
        }
    },
    ...dashboardRoutes,
    ...fullpageRoutes,
    { path: '*', redirect: { name: 'dashboard' } }
]