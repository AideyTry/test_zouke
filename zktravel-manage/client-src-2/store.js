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
        total:10,
        pages:{
            page:1,
            pageSIze:10
        },
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
        },
        total(state){
            console.log(state.total);
            return state.total;
        }
        /*SAI酒店库end*/
    },
    mutations: {
        initUserInfo(state, info){
            state.userInfo = info;
        },
        /*SAI酒店库start*/
        penddingList(state,list){
            // console.log(total);
            state.list=list;
        },
        count(state,count){
            state.total=count;
        },
        pages(state,page){
            state.page=page;
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
        penddings(context){
            let page=context.state.pages.page;
            let pageSize=context.state.pages.pageSize;
            console.log(page,pageSize);
            return ajax.post('/api/zk-hotel/query',{page:page,pageSize:pageSize}).then(json=>{
                console.log(json);
                console.log(json.count)
                context.commit('penddingList',json.list);
                context.commit('count',json.count);
            })
        }   
        /*SAI酒店库end*/
    }
});

export default store;