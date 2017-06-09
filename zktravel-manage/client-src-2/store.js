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
                    page:1
                }
        },
        /*我的发布start*/
        publish:{
            isTrue:true
        },
        /*我的发布end*/

        /*用户权限管理*/
        offlineRole:null
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
            return state.total;
        },
        /*我的发布start*/
        publish(state){
            return state.publish;
        },
        /*我的发布end*/
        offlineRole(state){
            return state.offlineRole;
        }

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
        penddingOpreat(state,object){
            state.counts.saiisTrue.pisTrue=object.pisTrue;
            state.counts.saiisTrue.onisTrue=object.onisTrue;
            state.counts.saiisTrue.ofisTrue=object.ofisTrue;
        },
        count(state,count){
            state.total=count;
        },
        pages(state,object){
            state.counts.flag.page=object.page;
            state.counts.flag.flag=object.flag;
            // console.log("p=",state.counts.flag.page);
            // console.log("f=",state.counts.flag.flag);
        },
        /*我的发布start*/
        publish(state,isTrue){
            state.publish.isTrue=isTrue;
        },
        /*我的发布end*/
        initRole(state,role){
            state.offlineRole = role;
        }
    },
    actions: {
        logout({ commit }){
            return ajax.post('/api/auth/logout', null, {loadingText: '注销中...'}).then(result=>{
                commit('initUserInfo', null);
            })
        },
        /*SAI酒店库start*/
        penddings(context){
            // let page=context.state.pages.page;
            let page=context.state.counts.flag.page-1;

            let pageSize=context.state.pages.pageSize;
            return ajax.post('/api/zk-hotel/query',{page:page,pageSize:pageSize}).then(json=>{
                // console.log(json.count)
                context.commit('penddingList',json.list);
                context.commit('count',json.count);
            })
        }   
        /*SAI酒店库end*/
    }
});

export default store;