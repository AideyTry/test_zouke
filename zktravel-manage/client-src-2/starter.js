//lib
import '@local/babel-helper';
import 'babel-polyfill';
import 'whatwg-fetch';
import 'pepjs';

import ajax from '@local/common/ajax';
import Vue from 'vue';
import router from './router';
import store from './store';
import { loading, toast, timeout } from './config';
import auth from './utils/auth';

/*引入需要的start*/
import 'bootstrap/dist/css/bootstrap.css'
/*引入需要的end*/
/// #if DEBUG
import * as core from '@local/common/core';
window._g = {
    z: core,
    Vue,
    router,
    store,
    ajax,
    debug: {}
}
/// #endif

// init ajax config
ajax.config({
    loading,
    toast,
    timeout,
    errorHandler: {
        logic: {
            '-1'(){
                router.replace(auth.loginRoute(router.currentRoute));
            },
            default(e){
                toast.show(e.detail.msg);
            }
        }
    }
});

export default function starter(){
    return new (
        Vue.extend({
            render(c){
                return c('router-view');
            }
        })
    )
    ({
        el: '#app',
        store,
        router
    });
}