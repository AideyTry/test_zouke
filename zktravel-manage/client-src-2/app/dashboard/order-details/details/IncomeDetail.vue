<style lang="scss" scoped>
    .income {
        .title {
            height: 40px;
            font-size: 18px;
            font-weight: 600;
            line-height: 40px;
        }
        .install {
            .label {

            }
            .el-row {
                height: 41px;
            }
            .el-input {
                display: inline-block;
                width: 80px;
            }
        }
        .card {
            margin: 20px 0;
        }
        .card::after {
            border: 1px solid #ccc;
        }
        .computed {
            height: 40px;
            line-height: 40px;
        }
        .divline {
            border-bottom: 1px dashed #ccc;
            margin: 0 20px;
        }
        .button-group {
            text-align: right;
        }
    }
</style>
<style>
    .radio {
        margin-top: 0;
        margin-bottom: 0;
    }
</style>
<template>
    <div class="income">
        <div class="install card">
            <div class="title">收款设置</div>
            <el-row>
                <el-col :span="10">
                    <span>收款汇率<i></i></span>
                    <span>1{{currency.sign}}=</span>
                    <el-input size="mini" type="number" v-model="params.reo"></el-input>
                                        <span>¥</span>
                    <!--                    <span>实时汇率：1€=4546¥</span>-->
                </el-col>
                <el-col :span="14">
                    <span>收款币种</span>
                    <el-radio disabled class="radio" v-model="params.currency" value="欧元" size="small" :label="currency.name">{{currency.name}}</el-radio>
                    <el-radio disabled class="radio" v-model="params.currency" value="人民币" size="small" label="人民币">人民币
                    </el-radio>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="10">
                    <span>
                        本次收款
                    </span>
                    <el-input size="mini" type="number" v-model="params.money"></el-input>
                    <span>{{currency.name}} ={{money}}¥</span>
                </el-col>

                <el-col :span="14" class="button-group" v-if="userole.GATHERING">
                    <el-button type="info" @click="payment" v-if="(!payflag)">收款</el-button>
                    <el-button type="info" @click="markpayment" v-if="payflag">录入线下付款</el-button>
                    <el-button type="danger" @click="cancelpayment" v-if="payflag">取消收款</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="divline"></div>
        <div class="stream card">
            <div class="title">收款流水</div>
            <div>
                <el-table border :data="order.pay_stream" v-if="order">
                    <el-table-column label="时间" prop="paytime">
                    </el-table-column>
                    <el-table-column label="操作人" prop="user.name">
                    </el-table-column>
                    <el-table-column label="渠道" prop="provider">
                    </el-table-column>
                    <el-table-column label="收款金额" prop="collection_info.money">
                        <template scope="scope">
                            <span>
                                {{scope.row.collection_info.money?scope.row.collection_info.money:0}}{{currency.name}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="合计">
                        <template scope="scope">
                            <span>
                                {{scope.row.collection_info.money?scope.row.collection_info.money*scope.row.collection_info.reo:0}}人民币
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-row type="flex" class="computed">
                <el-col style="text-align: right">
                    <!--<span>还需收款 ：{{leftmoney}} €</span>-->
                    <!--<span>收款总额 ：{{income}} €</span>-->
                    <span>还需收款 ：{{leftmoney}} {{currency.sign}}</span>
                    <span>收款总额 ：{{income}} {{currency.sign}}</span>
                    <span>{{incomeRmb}}¥</span>
                </el-col>
            </el-row>
        </div>
        <div class="divline"></div>
        <div class="plan card" v-if="order">
            <div class="title">收款计划
            </div>
            <el-row type="flex" class="computed" v-if="order.user_policy">
                <el-col :span="6" v-for="(v,k) in order.user_policy.payment" :key="k">
                    {{v.price}}({{v.dead_line}}前)
                </el-col>
            </el-row>
        </div>
        <div class="divline"></div>
        <div class="card">
            <div class="title">退款流水
                <el-button type="danger" style="float: right" @click="refundorder" v-if="userRole.REFUND">
                    退款
                </el-button>
            </div>

            <div>
                <el-table border :data="order.refund_stream" v-if="order">
                    <el-table-column label="时间" prop="refund_time">
                    </el-table-column>
                    <el-table-column label="原因" prop="reason">
                    </el-table-column>
                    <el-table-column label="操作人" prop="user.name">
                    </el-table-column>
                    <el-table-column label="渠道" prop="path">
                    </el-table-column>
                    <el-table-column label="退款金额" prop="money">
                    </el-table-column>
                </el-table>
            </div>
            <el-row type="flex" class="computed">
                <el-col style="text-align: right">
                    <span>退款总额 ：{{refundmoney}}€</span>
                    <span>¥</span>
                </el-col>
            </el-row>
        </div>
        <div class="divline"></div>
        <div class="card">
            <div class="title">供应商成本流水
                <el-button type="info" style="float: right" @click="changecost" v-if="userRole.REFUND">
                    修改成本
                </el-button>
            </div>
            <div>
                <el-table border :data="order.provider_stream" v-if="order">
                    <el-table-column label="时间" prop="provider_obj.time">
                    </el-table-column>
                    <el-table-column label="原因" prop="provider_obj.reason">
                    </el-table-column>
                    <el-table-column label="操作人" prop="provider_obj.user.name">
                    </el-table-column>
                    <el-table-column label="金额" prop="provider_obj.cost">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <paymentdialog @loadorder="loadorder" ref="dialogroup" :dialog="dialog" :income="newIncome" :leftmoney="newLeftmoney" @closedialog="closedialog"></paymentdialog>
        <refunddialog @loadorder="loadorder" ref="refund" :dialog="refunddialog" @closedialog="closedialog"></refunddialog>
        <changecost @loadorder="loadorder" ref="changecost" :dialog="changedialog" @closedialog="closedialog"></changecost>
    </div>
</template>
<script>
    import ajax  from '@local/common/ajax';
    import payment from '../dialogs/PaymentDialog'
    import refund from '../dialogs/RefundDialog'
    import changecost from '../dialogs/ChangeCostDialog'
    export default{
        components: {
            paymentdialog: payment,
            refunddialog:refund,
            changecost:changecost
        },
        data(){
            return {
                counts:0,
                newLeftmoney:0,
                newIncome:0,
                newMoney:0,
                radio: '',
                order: null,
                payplan: null,
                dialog: {
                    show: false
                },
                defunddialog: {
                    show: false
                },
                payflag: false,
                params: {
                    reo: 0,
                    currency: '欧元',
                    money: 0,
                    id: ''
                },
                refunddialog:{
                    show:false
                },
                changedialog:{
                    show:false
                }
            }
        },
        watch:{
            newMoney(){
                let num=0;
                if(this.newMoney){
                    num=parseFloat(this.newMoney);
                }
                this.newIncome=num;
            },
            newIncome(){
                this.newLeftmoney=this.counts-this.newIncome;
            }

        },
        methods: {
            loadorder(newLeftmoney){
                ajax.post('/api/team/order/detail', {id: this.$route.params.orderid}).then(
                    data => {

                        this.order = data.detail;
                        if (data.detail.collection_info) {
                            this.params = data.detail.collection_info;
                            this.params.money+=this.params.currency;
                            this.payflag = true;
                        }else {
                            this.params = {reo: 0, currency: '欧元', money: 0, id: ''}
                            this.payflag = false;
                        }

                        if(this.leftmoney<=0){
                            this.payflag = true;
                        }
                        /*加载数据start*/
                        let newArr=[];
                        let count=0;
                        this.order.price.cases.forEach(function(value){
                            value.price.forEach(function(item){
                                item.rooms.forEach(function(room,index){
                                    newArr.push(room.price.cost);
                                })
                            });
                        });
                        for(let i=0;i<newArr.length;i++){
                            count+=newArr[i];
                        }
                        this.counts=count;
                        this.params.money=parseFloat(this.params.money);

                        if(this.params.money===0){
                            this.newLeftmoney=this.counts;
                            if(newLeftmoney){
                                this.newLeftmoney=newLeftmoney;
                            }
                        }
                        if(typeof(newLeftmoney)=='object'){
                            this.newIncome=newLeftmoney.income;
//                    this.newLeftmoney=leftmoney;
                        }
                        /*加载数据end*/
                    }
                )
            },
            payment(){
                this.params.id = this.$route.params.orderid;
                ajax.post('/api/team/pay-stream/collection', this.params).then(
                    data => {
                        if (data.code == 0) {
                            this.dialog.show = true;
//                            this.$notify({
//                                title: '提交成功',
//                                message: '已提交付款信息',
//                                type: 'success'
//                            });
//                            this.loadorder(this.newLeftmoney);
                        }
                    }
                )
            },
            closedialog(){
                this.dialog.show = false;
            },
            cancelpayment(){
                ajax.post('/api/team/pay-stream/cancel', {id: this.$route.params.orderid}).then(
                    data => {
                        if (data.code == 0) {
                            this.$notify({
                                title: '取消成功',
                                message: '请重新输入收款信息',
                                type: 'success'
                            });
                            this.loadorder();
                        }
                    }
                )
            },
            markpayment(){
                this.$refs.dialogroup.dialog2.show = true;
            },
            refundorder(){
                this.refunddialog.show=true;
            },
            changecost(){
                this.changedialog.show=true;
            },
            /*款项收齐后不显示收款start*/
            collectPayment(){
            if(this.leftmoney<=0){
                    this.payflag = true;
                }
            }
            /*款项收齐后不显示收款end*/
        },
        computed: {
            userRole(){
                return this.$store.getters.offlineRole;
            },
            currency(){
                if(!this.order) return {};
                switch(this.order.requirement.currency){
                    case 'EUR':
                        return { name:'欧元', sign:'€' };
                    case 'GBP':
                        return { name:'英镑', sign:'￡' };
                }
            },
            money(){
//                return parseFloat((this.params.reo * this.params.money).toFixed(2));
                return parseInt(this.params.reo * this.params.money);
            },
            userole(){
                return this.$store.getters.offlineRole;

            },
            orderdatastatus(){
                return this.orderdata ? this.orderdata.status : '0'
            },
            leftmoney(){
                let pay=0;
                let income= (this.params.money*1)||0;
                if(this.order&& this.order.user_policy){
                    this.order.user_policy.payment.forEach(
                        (v,k)=>{
                            pay+=v.price*1;
                        }
                    )
                }
                if(this.order&& this.order.pay_stream){
                    this.order.pay_stream.forEach(
                        (v,k)=>{
                            income+=v.collection_info.money*1;
                        }
                    )
                }

                /*收款总额start*/
//                let newArr=[];
//                let count=0;
//                console.log("this.order.price.cases=",this.order.price.cases);
//                this.order.price.cases.forEach(function(value){
//                    value.price.forEach(function(item){
//                        item.rooms.forEach(function(room,index){
//                            newArr.push(room.price.cost);
//                        })
//                    });
//                });
//                for(let i=0;i<newArr.length;i++){
//                    count+=newArr[i];
//                }
//                pay=count;
                /*收款总额end*/
                return pay-income;
            },
            income(){
                let income=(this.params.money*1)||0;
                if(this.order&&this.order.pay_stream){
                    this.order.pay_stream.forEach(
                        (v,k)=>{
                            income+=v.collection_info.money*1;
                        }
                    )
                }
                return income;
            },
            /*收款总额人民币start*/
            incomeRmb(){
                let reo=0;
                if(this.order&& this.order.pay_stream){
                    this.order.pay_stream.forEach(
                        (v,k)=>{
                            reo=v.collection_info.reo;
                        }
                    )
                }
                if(reo){
//                    return parseFloat((this.income*reo).toFixed(2));
                    return parseInt(this.income*reo);
                }else{
//                    return parseFloat((this.income*this.params.reo).toFixed(2));
                    return parseInt(this.income*this.params.reo);
                }
            },
            /*收款总额人民币end*/
            refundmoney(){
                let money=0;
                if(this.order&&this.order.refund_stream){
                    this.order.refund_stream.forEach(
                        (v,k)=>{
                            money+=v.money*1
                        }
                    )
                }
                return money;
            }
        },
        mounted(){
            this.loadorder();
        },
        beforeUpdate(){
            this.newMoney=this.params.money;
        }
    }
</script>