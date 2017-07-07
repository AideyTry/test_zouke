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
        supplier:'',
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
        supplier(state){
            return state.supplier;
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
            if(info){
                state.offlineRole =acessRole(info.p.offline_order);
            }
        },
        /*我的发布start*/
        publish(state,isTrue){
            state.publish.isTrue=isTrue;
        },
        /*我的发布end*/
        valid(state,status){
            state.validfrom=status;
        },
        /*待控放start*/
        addCount(state){
            state.count=++state.count;
        },
        deleteCount(state){
            state.count=--state.count;
        },
        selectRoom(state){
            state.selectRoom=++state.selectRoom;
        },
        supplier(state,supplier_name){
            state.supplier=supplier_name;
        },
        /*待控放end*/
        /*报价通过start*/
        select(state,select){
            state.select=select;
        }
        /*报价通过end*/
    },
    actions: {
        logout({ commit }){
            return ajax.post('/api/auth/logout', null, {loadingText: '注销中...'}).then(result=>{
                commit('initUserInfo', null);
            })
        },
        /*待控房start*/
        updateOrders({commit},orders){
                    let arr=[];
                    let count_GTA=0;
                    let count_miki=0;
                    let str='';
                    orders.forEach(function(order){
                        order.hotels.forEach(function(hotels){
                            hotels.suppliers.forEach(function(supplier,index){
                                arr.push(supplier.supplier_name);
                            })
                        })
                    });
                    for(let i=0;i<arr.length;i++){
                        if(arr[i]=='GTA'){
                            count_GTA++;
                        }
                        if(arr[i]=='miki'){
                            count_miki++;
                        }
                    }
                    if(count_GTA==0&&count_miki==0){
                        commit('supplier',str)
                    }
                    if(count_GTA!=0&&count_miki==0){
                        str="GTA";
                        commit('supplier',str)
                    }
                    if(count_GTA==0&&count_miki!=0){
                        str="miki";
                        commit('supplier',str)
                    }
        }
        /*待控房end*/
    }
});

export default store;