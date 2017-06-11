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
            right: 70px;
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
            <el-col :span="4">
                <span class="title">我的需求 > 订单详情</span>
            </el-col>
            <el-col :span="4">
                <span class="status">待发布</span>
            </el-col>
        </el-row>
        <div class="order-detail">
            <el-tabs @tab-click="changetab" active-name="require-node">
                <el-tab-pane label="需求记录" name="require-node">
                    <orderdetail v-if="orderdata&&!change" :orderdata="orderdata"></orderdetail>
                    <changerequire v-if="orderdata&&change" :orderdata="orderdata"></changerequire>
                </el-tab-pane>
                <el-tab-pane label="报价记录" name="offer-node">

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

                </el-tab-pane>
                <div class="button-group">
                    <el-button v-if="userole.DISPATCH" @click="showdialog(1)" type="info" size="small">分配</el-button>
                    <el-button v-if="userole.UPDATE_ALL_REQUIREMENT" type="info" size="small" @click="togglechange">
                        {{change ? '放弃修改' : '修改'}}
                    </el-button>
                    <el-button v-if="userole.UPDATE_ALL_REQUIREMENT" v-show="change" @click="updateorder" style="color:#20a0ff;border-color:#20a0ff"
                               size="small">发布
                    </el-button>
                    <el-button v-if="userole.UPDATE_ALL_REQUIREMENT" v-show="change" @click="updatedraft" style="color:#20a0ff;border-color:#20a0ff"
                               size="small">存为草稿
                    </el-button>
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
    import orderDetail from './details/Orderdetail';
    import changeRequire from '../publish-require/PublishRequire.Page';
    import dialog1 from './dialogs/DistributeDialog'
    export default{
        components: {
            orderdetail: orderDetail,
            changerequire: changeRequire,
            dialog1:dialog1
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
                ]
            }
        },
        methods: {
            changetab(){

            },
            getorder(id){
                let vm = this;
                ajax.post('/api/team/order/detail', {
                    id: id
                }).then(
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
            updateorder(){
                ajax.post('/api/team/requirement/update',{
                    id:this.$route.params.orderid,
                    requirement:orderdata
                })
            },
            updatedraft(){

            }

        },
        computed: {
            orderid(){
                return this.$route.params.orderid;
            },
            userole(){
                return this.$store.getters.offlineRole;
            }
        },
        created(){
            this.getorder(this.$route.params.orderid);
        }
    }
</script>