import appRoutes from './app/routes';
import render from './RouterView.Render';

export default [{
    path: '/', component: { render }, name: 'root',
    meta: {
        title: '超级行程单-后台管理系统'
    },
    children: [
        ...appRoutes
    ]
}]