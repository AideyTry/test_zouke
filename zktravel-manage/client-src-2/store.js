import Vue from 'vue';
import Vuex from 'vuex';
import ajax from '@local/common/ajax';
import acessRole from './utils/assignRole';
Vue.use(Vuex);

const store = new Vuex.Store({
    /// #if DEBUG
    strict: true,
    /// #endif
    state:{
        userInfo: null,
        /*我的发布start*/
        publish:{
            isTrue:true
        },
        /*我的发布end*/

        /*用户权限管理*/
        offlineRole:null,
        orderCost:null
    },
    getters: {
        userInfo(state){
            return state.userInfo;
        },
        /*我的发布start*/
        publish(state){
            return state.publish;
        },
        /*我的发布end*/
        offlineRole(state){
            return state.offlineRole;
        },
        orderCost(state){
            return state.orderCost;
        }

    },
    mutations: {
        initUserInfo(state, info){
            state.userInfo = info;
            state.offlineRole =acessRole(info.p.offline_order);
        },
        /*我的发布start*/
        publish(state,isTrue){
            state.publish.isTrue=isTrue;
        },
        initCost(state,info){
            state.orderCost=info;
        }
        /*我的发布end*/
    },
    actions: {
        logout({ commit }){
            return ajax.post('/api/auth/logout', null, {loadingText: '注销中...'}).then(result=>{
                commit('initUserInfo', null);
            })
        }
    }
});

export default store;