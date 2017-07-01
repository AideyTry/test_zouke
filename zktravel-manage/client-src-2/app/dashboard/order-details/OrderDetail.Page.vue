<style lang="scss" scoped>
    .order-detail-container {
        height: 90%;
        width: 100%;
        padding: 0 30px;
        box-sizing:border-box;
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
            box-sizing:border-box;
            overflow-y: auto;
            margin-bottom: 80px;
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
                <span class="status">{{orderdata ? orderstatus[orderdata.status] : '待发布'}}</span>
            </el-col>
        </el-row>
        <div class="order-detail">
            <el-tabs @tab-click="changetab" :active-name="activetabs">
                <el-tab-pane label="需求记录" name="require-node">
                    <requiredetail v-if="orderdata&&!change&&activetabs=='require-node'"
                                   :orderdata="orderdata"></requiredetail>
                    <changerequire v-if="orderdata&&change&&activetabs=='require-node'"
                                   :orderdata="orderdata"></changerequire>
                </el-tab-pane>
                <el-tab-pane label="报价记录" name="offer-node">
                    <offerdetail ref="offerdetaildata" v-if="activetabs=='offer-node'"></offerdetail>
                </el-tab-pane>
                <el-tab-pane label="订单详情" name="order-detail">
                    <orderDetail v-if="orderdata&&activetabs=='order-detail'" :orderdata="orderdata"></orderDetail>
                </el-tab-pane>
                <el-tab-pane label="收入/支出" name="in-out">
                    <income-detail v-if="orderdata&&activetabs=='in-out'&&orderdatastatus>5"></income-detail>
                </el-tab-pane>
                <el-tab-pane label="开票记录" name="ticket-node">
                    <invoice-detail v-if="orderdata&&activetabs=='ticket-node'"></invoice-detail>
                </el-tab-pane>
                <el-tab-pane label="投诉记录" name="complain-node">
                    <complain-node v-if="orderdata&&activetabs=='complain-node'"></complain-node>
                </el-tab-pane>
                <el-tab-pane label="留言/操作" name="message-node">
                    <messageDetail v-if="orderdata&&activetabs=='message-node'" :orderData="orderdata"></messageDetail>
                </el-tab-pane>
                <div class="button-group">
                    <!--客服发布-->
                    <el-button v-if="userole.UPDATE_SELF_REQUIREMENT&&activetabs=='require-node'" v-show="!change"
                               type="info" size="small" @click="togglechange">修改
                    </el-button>
                    <el-button v-if="userole.UPDATE_SELF_REQUIREMENT&&activetabs=='require-node'" v-show="change"
                               @click="updatedraft" style="color:#20a0ff;border-color:#20a0ff"
                               size="small">保存
                    </el-button>
                    <el-button v-if="userole.UPDATE_SELF_REQUIREMENT&&activetabs=='require-node'&&orderdatastatus==1"
                               @click="publishorder" style="color:#20a0ff;border-color:#20a0ff"
                               size="small">发布
                    </el-button>
                    <!--管理员分配-->
                    <el-button v-if="userole.DISPATCH&&activetabs=='require-node'&&!change&&orderdatastatus==2"
                               @click="showdialog(1)" type="info" size="small">分配
                    </el-button>
                    <!--订房员报价-->
                    <el-button type="info" @click="submitoffer" size="small"
                               v-if="userole.UPDATE_PRICE&&activetabs=='offer-node'&&orderdatastatus==3">提交报价
                    </el-button>
                    <!--管理员审核-->
                    <el-button type="success" @click="passOffer" size="small"
                               v-if="userole.CHECK_PRICE&&activetabs=='offer-node'&&orderdatastatus==4">审核通过
                    </el-button>
                    <el-button type="danger" @click="showdialog(2)" size="small"
                               v-if="userole.CHECK_PRICE&&activetabs=='offer-node'&&orderdatastatus==4">重新报价
                    </el-button>
                    <!--客服审核-->
                    <el-button type="success" @click="showdialog(3)" size="small"
                               v-if="userole.CONFIRM_PRICE&&activetabs=='offer-node'&&orderdatastatus==5">报价通过
                    </el-button>
                    <el-button type="danger" @click="customRejectOffer" size="small"
                               v-if="userole.CONFIRM_PRICE&&activetabs=='offer-node'&&orderdatastatus==5">重新报价
                    </el-button>
                    <el-button type="primary" @click="showdialog(4)" size="small"
                               v-if="activetabs=='ticket-node'">填写发票
                    </el-button>
                    <!--待控房订房员订单start-->
                    <!--<el-button type="success" @click="saveOrder" size="small"-->
                               <!--v-if="userole.UPDATE_ORDER&&orderdatastatus==8" >保存-->
                    <!--</el-button>-->
                    <!--待控房订房员订单start-->
                </div>
                <div class="dialog-group">
                    <dialog1 @closedialog="closedialog" :dialoggroup="dialoggroup" v-if="userole.DISPATCH"
                             :pickerOptions="pickerOptions"></dialog1>
                    <dialog2 @closedialog="closedialog" :dialoggroup="dialoggroup"></dialog2>
                    <dialog3 @closedialog="closedialog" :dialoggroup="dialoggroup"
                             v-if="userole.CONFIRM_PRICE&&activetabs=='offer-node'&&orderdatastatus==5"></dialog3>
                    <dialog4 @closedialog="closedialog" :dialoggroup="dialoggroup" :pickerOptions="pickerOptions"></dialog4>
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
    import dialog2 from './dialogs/RejectOfferDialog';
    import dialog3 from './dialogs/CustomerPassDialog';
    import dialog4 from './dialogs/FillInvoice';
    import offerDetail from './details/OfferDetail';
    import orderDetail from './details/orderDetail';
    import messageDetail from './details/MessageDetail';
    import incomeDetail from './details/IncomeDetail';
    import invoiceDetail from './details/InvoiceDetail';
    import complainNode from './details/ComplainNode';
    export default {
        components: {
            requiredetail: requireDetail,
            changerequire: changeRequire,
            dialog1: dialog1,
            dialog2: dialog2,
            dialog3: dialog3,
            dialog4: dialog4,
            offerdetail: offerDetail,
            orderDetail: orderDetail,
            messageDetail: messageDetail,
            incomeDetail: incomeDetail,
            invoiceDetail: invoiceDetail,
            complainNode: complainNode
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
                /*弹出框*/
                dialoggroup: [
                    {
                        show: false,
                        model: {
                            action: null,
                            date: new Date()
                        },
                        rule: null
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false,
                        model: {
                           myData:[],
                           company:'',
                           country:'',
                           address:'',
                           invoicetype:'',
                           cash:'',
                           money:'',
                           date:new Date()
                        },
                        rule: null
                    }
                ],
                tab: null,
                activetabs: 'require-node',
                orderstatus: ['', '待发布', '待分配', '待报价', '报价待审核', '报价待确认', '待收款', '分房待确认', '待控房', '已控房']
            }
        },
        methods: {
            changetab(tab){
                this.tab = tab.name;
                this.activetabs = tab.name;
                this.$router.push({
                    name: 'dashboard-order-detail',
                    params: {id: this.$route.params.orderid, status: tab.name}
                })
            },
            getorder(id){
                ajax.post('/api/team/order/detail', {
                    id: id
                }, {lock: false}).then(
                    data => {
                        this.orderdata = data.detail;
                    }
                )
            },
            togglechange(){
                this.change = !this.change;
            },
            showdialog(n){
                this.dialoggroup[n - 1].show = true;
            },
            closedialog(n){
                this.dialoggroup[n - 1].show = false;
                this.getorder(this.$route.params.orderid);
            },
            updatedraft(){
                let vm = this;
                ajax.post(`/api/team/requirement/${
                    this.orderdata.status===1?'draft-update':'update'
                }`, {
                    id: vm.$route.params.orderid,
                    requirement: vm.orderdata.requirement
                }).then(
                    data => {
                        if (data.code == 0) {
                            vm.getorder(vm.$route.params.orderid);
                            vm.change = false;
                            this.$notify({
                                title: '更新成功',
                                message: '已更新需求',
                                type: 'success'
                            });
                        }
                    }
                )
            },
            publishorder(){
                let vm = this;
                ajax.post('/api/team/requirement/draft-publish', {
                    id: this.$route.params.orderid,
                    requirement: this.orderdata.requirement
                }).then(
                    data => {
                        if (data.code == 0) {
                            vm.getorder(vm.$route.params.orderid);
                            vm.change = false;
                            this.$notify({
                                title: '发布成功',
                                message: '已成功发布，等待分配',
                                type: 'success'
                            });
                        }
                    }
                )
            },
            submitoffer(){
                let params = [];
                let vm=this;
                this.$commit('valid',true);
                this.$refs.offerdetaildata.editableTabs.forEach(
                    (v, k) => {
                        params.push({
                                sp_policy: {
                                    booking_channel: v.provider.booking_channel,
                                    payment: v.provider.payment_policy,
                                    cancel: v.provider.cancel_policy,
                                    remark: v.provider.remark,
                                },
                                price: []
                            }
                        );
                        v.params.forEach(
                            (a, b) => {
                                params[k].price.push({hotel:a.hotel, rooms: []})
                                a.rooms.forEach(
                                    (l, d) => {
                                        params[k].price[b].rooms.push(l)
                                    }
                                )
                            }
                        )
                    }
                )
                ajax.post('/api/team/price/commit', {
                    id: this.$route.params.orderid,
                    price: {cases: params},
                    requirementLastTime: this.orderdata.requirement.last_update
                }).then(
                    data => {
                        if (data.code == 0) {
                            this.$notify({
                                title: '报价成功',
                                message: '已成功更新报价，等待通过',
                                type: 'success'
                            });
                            vm.getorder(vm.$route.params.orderid);
                        }else{
                            this.$notify({
                                title: '不可提交',
                                message: '必填项信息缺失',
                                type: 'warning'
                            });
                        }
                    }
                )
            },
            passOffer(){
                let vm = this;
                let params = [];
                let user = JSON.parse(JSON.stringify(this.$refs.offerdetaildata.userchannel));
                this.$refs.offerdetaildata.editableTabs.forEach(
                    (v, k) => {
                        params.push({
                                sp_policy: {
                                    booking_channel: v.provider.booking_channel,
                                    payment: v.provider.payment_policy,
                                    cancel: v.provider.cancel_policy,
                                    remark: v.provider.remark,
                                },
                                price: []
                            }
                        );
                        v.params.forEach(
                            (a, b) => {
                                params[k].price.push({hotel: a.hotel, rooms: []})
                                a.rooms.forEach(
                                    (l, d) => {
                                        params[k].price[b].rooms.push(l)
                                    }
                                )
                            }
                        )
                    }
                )
                user.payment.forEach(
                    (v, k) => {
                        v.dead_line = new Date(v.dead_line).format('YYYY-MM-DD')
                    }
                )
                let _params = {
                    userPolicy: user,
                    id: this.$route.params.orderid,
                    price: {cases: params}
                };
                ajax.post('/api/team/price/resolve', _params).then(
                    data => {
                        if (data.code == 0) {
                            vm.$notify({
                                title: '报价通过',
                                message: '报价通过，等待用户同意',
                                type: 'success'
                            });
                            vm.getorder(vm.$route.params.orderid);
                        } else {
                            vm.$notify({
                                title: '审核失败',
                                message: '必填项信息缺失',
                                type: 'warning'
                            });
                        }
                    }
                )
            },
            customRejectOffer(){
                let vm = this;
                ajax.post('/api/team/price/disagree', {
                    id: this.$route.params.orderid
                }).then(
                    data => {
                        if (data.code == 0) {
                            vm.$notify({
                                title: '成功驳回报价',
                                message: '成功驳回报价，等待重新报价',
                                type: 'success'
                            });
                            this.getorder(vm.$route.params.orderid);
                        }
                    }
                )
            },
            /*保存订单start*/
            saveOrder(){
                console.log(111);
            }
            /*保存订单end*/
        },
        computed: {
            orderid(){
                return this.$route.params.orderid;
            },
            userole(){
                return this.$store.getters.offlineRole;

            },
            orderdatastatus(){
                return this.orderdata ? this.orderdata.status : '0'
            }
        },
        created(){
            this.getorder(this.$route.params.orderid);
            this.activetabs = this.$route.params.status;
        }
    }
</script>