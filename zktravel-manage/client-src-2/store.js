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
        /*待控放start*/
        count:2,
        selectRoom:0,
        /*待控放end*/
        /*用户权限管理*/
        offlineRole:null,
        validfrom:false
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
        /*待控放start*/
        count(state){
          return state.count;
        },
        selectRoom(state){
            return state.selectRoom;
        },
        /*待控放end*/
        offlineRole(state){
            return state.offlineRole;
        },
        validfrom(state){
            return state.validfrom;
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
        /*我的发布end*/
        valid(state,status){
            state.validfrom=status;
        }
        /*待控放start*/
        addCount(state){
            state.count=++state.count;
        },
        deleteCount(state){
            state.count=--state.count;
        },
        selectRoom(state){
            state.selectRoom=++selectRoom;
        }
        /*待控放end*/
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