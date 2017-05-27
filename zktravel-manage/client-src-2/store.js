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
                isTrue:{
                    eisTrue:false,
                    aisTrue:false,
                },
                flag:{
                    flag:false,  //记录状态进行跳转页面使用
                    page:null
                },
                name:"miki名",
                address:"miki地址",
                phone:"miki电话",
                kms:{
                    name:"miki名",
                    address:"miki地址",
                    phone:"miki电话",
                },
                 dls:{
                    name:"dl名",
                    address:"dl地址",
                    phone:"dl电话",
                },
                 vts:{
                    name:"vt名",
                    address:"vt地址",
                    phone:"vt电话",
                },
                 bks:{
                    name:"bk名",
                    address:"bk地址",
                    phone:"bk电话",
                },
                id:2,
                sname:"sai",
                level:"五星",
                country:"法国",
                city:"巴黎",
                area:"15区",
                dates:"已上架-待审核",
                handel:"审核"
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
        }
        /*SAI酒店库start*/
        // penddding(state,list){
        //     console.log(list);
        // }       
        /*SAI酒店库end*/
    },
    actions: {
        logout({ commit }){
            return ajax.post('/api/auth/logout', null, {loadingText: '注销中...'}).then(result=>{
                commit('initUserInfo', null);
            })
        },
        /*SAI酒店库start*/
        pendding(context){
            return ajax.post('/api/zk-hotel/query').then(json=>{
                console.log(json);
                // commit('pendddingList',json.list);
                // context.state.list=json.list;
            })
        }   
        /*SAI酒店库end*/
    }
});

export default store;