import ajax from '@local/common/ajax';
import { loginPage } from '../config';

export default {
    isLogin() /* => promise */ {
        return ajax.postSilence('/api/auth/is-login').then(result=>{
            if(result.code === 0) return result.userInfo;
            else return false; 
        });
    },
    loginRoute(redirectRoute){
        const current = {
            name: redirectRoute.name,
            query: redirectRoute.query,
            params: redirectRoute.params
        }
        return {
            name: loginPage,
            query: {
                redirect: JSON.stringify(current)
            }
        };
    }
}