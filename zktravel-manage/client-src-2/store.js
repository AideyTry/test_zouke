import Vue from 'vue';
import Vuex from 'vuex';
import ajax from '@local/common/ajax';
Vue.use(Vuex);

const store = new Vuex.Store({
    /// #if DEBUG
    strict: true,
    /// #endif
    state:{
        userInfo: null,

        /*SAI酒店库数据start*/
        list:[],

        counts: {
                saiisTrue:{
                    pisTrue:false,
                    ofisTrue:false,
                    onisTrue:false
                },
                isTrue:{
                    eisTrue:false,
                    aisTrue:false,
                },
                flag:{
                    flag:false,  //记录状态进行跳转页面使用
                    page:null
                }
        }
        /*SAI酒店库数据end*/
    },
    getters: {
        userInfo(state){
            return state.userInfo;
        },
        /*SAI酒店库start*/
        counts(state){
            return state.counts;
        },
        list(state){
            return state.list;
        }
        /*SAI酒店库end*/
    },
    mutations: {
        initUserInfo(state, info){
            state.userInfo = info;
        },
        /*SAI酒店库start*/
        penddingList(state,list){
            state.list=list;
        }       
        /*SAI酒店库end*/
    },
    actions: {
        logout({ commit }){
            return ajax.post('/api/auth/logout', null, {loadingText: '注销中...'}).then(result=>{
                commit('initUserInfo', null);
            })
        },
        /*SAI酒店库start*/
        penddings({commit}){
            return ajax.post('/api/zk-hotel/query').then(json=>{
                console.log(json);
                commit('penddingList',json.list);
            })
        }   
        /*SAI酒店库end*/
    }
});

export default store;