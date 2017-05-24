
import store from 'root/store';
import ajax from '@local/common/ajax';
import auth from 'root/utils/auth';

export default function checkAuth(to, from, next){
    let needAuth = true;
    for(let record of to.matched){
        switch(record.meta.auth){
            case true:
            case false:
                needAuth = record.meta.auth;
                break;
        }
    }
    if(!needAuth) return next();

    const userInfo = store.getters['userInfo'];
    if(userInfo) return next();

    auth.isLogin().catch(e=>{
        return false;
    }).then(result=>{
        if(result===false) next(Object.assign({replace:true}, auth.loginRoute(to)))
        else {
            store.commit('initUserInfo', result);
            next();
        }
    });
}