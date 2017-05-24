import Vue from 'vue';
import Vuex from 'vuex';
import ajax from '@local/common/ajax';
Vue.use(Vuex);

const store = new Vuex.Store({
    /// #if DEBUG
    strict: true,
    /// #endif
    state:{
        userInfo: null
    },
    getters: {
        userInfo(state){
            return state.userInfo;
        }
    },
    mutations: {
        initUserInfo(state, info){
            state.userInfo = info;
        }
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