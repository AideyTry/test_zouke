import Vue from 'vue'
import Vuex from 'vuex'
import ajax from '@local/common/ajax';
Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        token:null,
        userInfo:null,
        hash:null,
        logout:null,
        passName:null,
        opreat:{
            zkId:null,
            spId:null,
            sign:null
        },
        toast:{
            match:false,
            put:false,
            unnecessary:false
        },
        putisTrue:false,
        //信息更新后点击刷新和强制入库
        // closePutisTrue:false,
        putConstraint:false,

        listVt:[],
        listMk:[],
        listDl:[],
        listBk:[],
        newList:[],
        idData:{
    		vti:null,
    		mki:null,
    		dli:null
        },

        list:[],
        flag:{
            flag:false,  //记录状态进行跳转页面使用
            page:null
        },

        //SAI酒店库数据
        saiisTrue:{
            pisTrue:false,
            ofisTrue:false,
            onisTrue:false
        },
        counts: {
                isTrue:{
                    eisTrue:false,
                    aisTrue:false,
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

    },
    // getters:{
    //     getlist:(state)=>{
    //         return state.list;
    //     }
    // },
    actions:{
        actionVt(context){
            return  ajax.post('/api/vt-mapping/query').then(json=>{
                if(json.code===0){
                    context.state.listVt=json.list;
                }  
            })
        },
        actionMk(context){
             return  ajax.post('/api/mk-mapping/query').then(json=>{
                if(json.code===0){
                    context.state.listVt=json.list;
                }  
            })
        },
        actionDl(context){
            return  ajax.post('/api/dl-mapping/query').then(json=>{
                if(json.code===0){
                    context.state.listVt=json.list;
                }  
            })
        },
        actionBk(context){
         // return  ajax.post('/api/bk-mapping/query').then(json=>{
         //        if(json.code===0){
         //            context.state.listVt=json.list;
         //            console.log(JSON.parse(JSON.stringify(context.state.listVt)))
         //        }  
         //    })
        },

       
        //匹配
        actionOmath(context){
            console.log(context.state.opreat.zkId,context.state.opreat.spId);
            let spId=context.state.opreat.spId;
            let zkId=context.state.opreat.zkId;
            console.log(spId,zkId);
            return ajax.post('/api/vt-mapping/map',{spId:spId,zkId:zkId}).then(json=>{
                console.log(json);
                if(json.code===0){
                    context.dispatch('actionVt');
                    context.commit('toastMatch');
                }

            })
        },

        //入库,
         /*
            1:hotel 没有找到
            2:没有map信息
           若入库的code为 3:map信息已经更新，要做提示,刷新和强制入库按钮，点强制入库后后再传后台，此时sign变为0
        */
        actionOput(context){
            let sign=context.state.opreat.sign;
            let spId=context.state.opreat.spId;
            let zkId=context.state.opreat.zkId;
            console.log(sign,spId,zkId);
            return ajax.post('/api/vt-mapping/insert',{sign:sign,spId:spId}).then(json=>{
                console.log(json);
                if(json.code===0){
                    context.dispatch('actionVt');
                    context.commit('toastPut');
                }
                else if(json.code===1){
                    console.log("hotel没有找到");
                }
                else if(json.code===2){
                    console.log("没有map信息");
                }
                else if(json.code===3){
                    console.log("map信息已经更新");
                    context.commit('putIstrue');
                    if(context.state.putConstraint===true){
                        return ajax.post('/api/vt-mapping/insert',{sign:0,spId:spId}).then(json=>{
                        context.dispatch('actionVt');
                        })
                    }
                    

                }
            })
        },
        //置为无效
        actionOu(context){
            let spId=context.state.opreat.spId;
            console.log(spId);
            return ajax.post('/api/vt-mapping/invalid',{spId:spId}).then(json=>{
                console.log(json);
                if(json.code===0){
                    context.dispatch('actionVt');
                    context.commit('toastUnnecessary');
                }
            })
        }
    },
    mutations: {
        login(state,json){
            state.token=json.code;
            state.userInfo=json.userInfo;
            window.localStorage.token=json.code;

        },
        login1(state,token){
            state.token=token;
        },
        logout(state,json){
            state.logout=json.code;
        },
        mk(state) {
            state.counts.name=state.counts.kms.name;
            state.counts.address=state.counts.kms.address;
            state.counts.phone=state.counts.kms.phone;
        },
        dl(state){
            state.counts.name=state.counts.dls.name;
            state.counts.address=state.counts.dls.address;
            state.counts.phone=state.counts.dls.phone;
        },
        vt(state) {
            state.counts.name=state.counts.vts.name;
            state.counts.address=state.counts.vts.address;
            state.counts.phone=state.counts.vts.phone;
            /*修改的*/
        },
        bk(state) {
            state.counts.name=state.counts.bks.name;
            state.counts.address=state.counts.bks.address;
            state.counts.phone=state.counts.bks.phone;
        },
        //操作数据匹配，入库，置位无效
        opreatMatch(state,item){
            state.opreat.zkId=item.zkId;
            state.opreat.spId=item.spId;
        },
        //当返回的code是3，强制进入去调用接口
        putConstraint(state){
            state.putConstraint=true;
        },
        toastMatch(state){
            state.toast.match=true;
        },
        opreatPut(state,item){
            state.opreat.sign=item.sign;
            state.opreat.zkId=item.zkId;
            state.opreat.spId=item.spId;
        },
        toastPut(state){
            state.toast.put=true;
        },
        putIstrue(state){
            state.putisTrue=true;
        },
        //强制入库的确认
        closePut(state){
            state.putisTrue=false;
        },
        opreatUnnecessary(state,item){
            state.opreat.spId=item.spId;
        },
        toastUnnecessary(state){
            state.toast.unnecessary=true;
        },
        exit(state){
            state.counts.isTrue.eisTrue=true;
        },
        c(state){
            state.counts.isTrue.eisTrue=false;
        },
        audit(state){
            state.counts.isTrue.aisTrue=true;
        },
        getId(state,id){
        		state.idData.vti=id;
        },
        getMk(state,id){
        		state.idData.mki = id;
        },
        getDl(state,id){
        		state.idData.dli = id;
        }
    }
})