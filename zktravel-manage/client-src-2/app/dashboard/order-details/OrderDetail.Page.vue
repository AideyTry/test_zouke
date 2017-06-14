<style lang="scss" scoped>
    .order-detail-container {
        height: 90%;
        width: 100%;
        padding: 0 30px;
        color: #1F2D3D;
        .title {
            height: 60px;
            font-size: 18px;
            line-height: 60px;
            .el-col {
                min-width: 176px;
            }
            .status {
                border: 1px solid #FF4949;
                font-size: 14px;
                color: #FF4949;
                display: inline-block;
                height: 30px;
                width: 80px;
                line-height: 30px;
                text-align: center;
                border-radius: 15px;
            }
        }
        .order-detail {
            min-width: 850px;
            width: 100%;
            background: #F9FAFC;
            padding: 0px 20px;
            h4 {
                display: inline-block;
                width: 80px;
            }
            .el-tag {
                margin: 0 20px;
            }
        }

        .detail-title {
            height: 40px;
            line-height: 40px;
        }

        .creator-info {
            height: 40px;
            line-height: 40px;
            span {
                display: inline-block;
                margin: 0 10px;
            }
        }
        .button-group {
            position: absolute;
            top: -50px;
            right: 30px;
            z-index: 99;
        }
    }
</style>
<style>
    .el-tabs__content {
        overflow: inherit !important;
    }
</style>
<template>
    <div class="order-detail-container">
        <el-row class="title">
            <el-col>
                <span class="title">我的需求 > 订单详情</span>
                <span class="status">{{orderdata?orderstatus[orderdata.status]:'待发布'}}</span>
            </el-col>
        </el-row>
        <div class="order-detail">
            <el-tabs @tab-click="changetab" :active-name="activetabs">
                <el-tab-pane label="需求记录" name="require-node">
                    <requiredetail v-if="orderdata&&!change" :orderdata="orderdata"></requiredetail>
                    <changerequire v-if="orderdata&&change" :orderdata="orderdata"></changerequire>
                </el-tab-pane>
                <el-tab-pane label="报价记录" name="offer-node">
                    <offerdetail ref="offerdetaildata" v-if="activetabs=='offer-node'"></offerdetail>
                </el-tab-pane>
                <el-tab-pane label="订单详情" name="order-detail">

                </el-tab-pane>
                <el-tab-pane label="收入/支出" name="in-out">

                </el-tab-pane>
                <el-tab-pane label="开票记录" name="ticket-node">

                </el-tab-pane>
                <el-tab-pane label="投诉记录" name="complain-node">

                </el-tab-pane>
                <el-tab-pane label="留言/操作" name="message-node">
                    <messageDetail></messageDetail>
                </el-tab-pane>
                <div class="button-group">
                    <el-button v-if="userole.UPDATE_SELF_REQUIREMENT&&activetabs=='require-node'||userole.UPDATE_ALL_REQUIREMENT" v-show="!change" type="info" size="small" @click="togglechange">
                        修改
                    </el-button>
                    <el-button v-if="userole.UPDATE_SELF_REQUIREMENT&&activetabs=='require-node'||userole.UPDATE_ALL_REQUIREMENT" v-show="change" @click="updatedraft" style="color:#20a0ff;border-color:#20a0ff"
                               size="small">保存
                    </el-button>
                    <el-button v-if="userole.UPDATE_SELF_REQUIREMENT&&activetabs=='require-node'||userole.UPDATE_ALL_REQUIREMENT"  @click="publishorder" style="color:#20a0ff;border-color:#20a0ff"
                               size="small">发布
                    </el-button>
                    <el-button v-if="userole.DISPATCH&&activetabs=='require-node'&&!change&&orderdatastatus==2" @click="showdialog(1)" type="info" size="small">分配</el-button>
                    <el-button @click="submitoffer" size="small">提交报价</el-button>
                </div>
                <div class="dialog-group">
                    <dialog1 @closedialog="closedialog" :dialoggroup="dialoggroup"  v-if="userole.DISPATCH" :pickerOptions="pickerOptions"></dialog1>
                </div>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import ajax  from '@local/common/ajax';
    import requireDetail from './details/RequireDetail';
    import changeRequire from '../publish-require/PublishRequire.Page';
    import dialog1 from './dialogs/DistributeDialog';
    import offerDetail from './details/OfferDetail';
    import messageDetail from './details/MessageDetail';
    export default{
        components: {
            requiredetail: requireDetail,
            changerequire: changeRequire,
            dialog1:dialog1,
            offerdetail:offerDetail,
            messageDetail:messageDetail
        },
        data(){
            return {
                change: false,
                orderdata: null,
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                dialoggroup:[
                    {
                        show:false,
                        model:{
                            action:null,
                            date:new Date()
                        },
                        rule:null
                    }
                ],
                tab:null,
                activetabs:'require-node',
                orderstatus:['','待发布','待分配','待报价','报价待审核','报价待确认','待收款','分房待确认','待控房','已控房']
            }
        },
        methods: {
            changetab(tab){
                this.tab=tab.name;
                this.activetabs=tab.name;
                this.$router.push({name:'dashboard-order-detail',params:{id:this.$route.params.orderid,status:tab.name}})
            },
            getorder(id){
                let vm = this;
                ajax.post('/api/team/order/detail', {
                    id: id
                },{lock:false}).then(
                    data => {
                        vm.orderdata = data.detail;
                    }
                )
            },
            togglechange(){
                this.change = !this.change;
            },
            showdialog(n){
                this.dialoggroup[n-1].show=true;
            },
            closedialog(n){
                this.dialoggroup[n-1].show=false;
            },
            updatedraft(){
                let vm=this;
                ajax.post('/api/team/requirement/update',{
                    id:vm.$route.params.orderid,
                    requirement:vm.orderdata.requirement
                }).then(
                    data=>{
                        if(data.code=0){
                            vm.getorder(vm.$route.params.orderid);
                            vm.change=false;
                        }
                    }
                )
            },
            publishorder(){
                ajax.post('/api/team/requirement/draft-publish',{
                    id:this.$route.params.orderid,
                    requirement:this.orderdata.requirement
                })
            },
            submitoffer(){
                let params=[];
                this.$refs.offerdetaildata.editableTabs.forEach(
                    (v,k)=>{
                        params.push([]);
                        v.params.forEach(
                            (a,b)=>{
                                params[k].push({hotel:a.hotel,rooms:[]})
                                a.room.forEach(
                                    (l,d)=>{
                                        params[k][b].rooms.push({price:l})
                                    }
                                )
                            }
                        )
                    }
                )
                ajax.post('/api/team/price/commit',{
                    id:vm.$route.params.orderid,
                    requirement:params
                }).then(
                    data=>{

                    }
                )
            }

        },
        computed: {
            orderid(){
                return this.$route.params.orderid;
            },
            userole(){
                return this.$store.getters.offlineRole;
            },
            orderdatastatus(){
                return  this.orderdata? this.orderdata.status:'0'
            }
        },
        created(){
            this.getorder(this.$route.params.orderid);
            this.activetabs=this.$route.params.status;
        }
    }
</script>