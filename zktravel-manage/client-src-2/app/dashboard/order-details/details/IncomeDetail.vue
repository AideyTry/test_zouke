<style lang="scss" scoped>
    .income {
        .title {
            height: 40px;
            font-size: 18px;
            font-weight: 600;
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
        .divline{
            border-bottom: 1px dashed #ccc;
            margin: 0 20px;
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
                    <span>1€=</span>
                    <el-input size="mini" type="number" v-model="params.reo"></el-input>
<!--                    <span>¥</span>
                    <span>实时汇率：1€=4546¥</span>-->
                </el-col>
                <el-col :span="14">
                    <span>收款币种</span>
                    <el-radio class="radio" v-model="params.currency" value="欧元" size="small" label="欧元">欧元</el-radio>
                    <el-radio class="radio" v-model="params.currency" value="人民币" size="small" label="人民币">人民币</el-radio>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="10">
                    <span>
                        本次收款
                    </span>
                    <el-input size="mini" type="number" v-model="params.money"></el-input>
                    <span>€ ={{money}}¥</span>
                </el-col>
                <el-col>

                </el-col>
                <el-col :span="8">
                    <el-button type="info" @click="payment" v-if="!payflag">收款</el-button>
                    <el-button type="info" @click="markpayment" v-if="payflag">录入线下付款</el-button>
                    <el-button type="danger" @click="cancelpayment" v-if="payflag">取消收款</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="divline"></div>
        <div class="stream card">
            <div class="title">收款流水</div>
            <div>
                <el-table border>
                    <el-table-column label="时间">
                    </el-table-column>
                    <el-table-column label="操作人">
                    </el-table-column>
                    <el-table-column label="渠道">
                    </el-table-column>
                    <el-table-column label="收款金额">
                    </el-table-column>
                    <el-table-column label="收款金额">
                    </el-table-column>
                </el-table>
            </div>
            <el-row type="flex" class="computed">
                <el-col>
                </el-col>
                <el-col :span="9">
                    <span>还需收款 ：90€</span>
                    <span>收款总额 ：70€</span>
                    <span>999¥</span>
                </el-col>
            </el-row>
        </div>
        <div class="divline"></div>
        <div class="plan card" v-if="order">
            <div class="title">收款计划</div>
            <el-row type="flex" class="computed" v-if="order.user_policy">
                <template v-for="(v,k) in order.user_policy.payment">
                    <el-col :span="6">
                        {{v.price}}({{v.dead_line}}前)
                    </el-col>
                </template>
            </el-row>
        </div>
        <div class="divline"></div>
        <div class="card">
            <div class="title">退款流水</div>
            <div>
                <el-table border>
                    <el-table-column label="时间">
                    </el-table-column>
                    <el-table-column label="原因">
                    </el-table-column>
                    <el-table-column label="操作人">
                    </el-table-column>
                    <el-table-column label="渠道">
                    </el-table-column>
                    <el-table-column label="退款金额">
                    </el-table-column>
                    <el-table-column label="退款金额">
                    </el-table-column>
                </el-table>
            </div>
            <el-row type="flex" class="computed">
                <el-col>
                </el-col>
                <el-col :span="9">
                    <span>还需收款 ：90€</span>
                    <span>收款总额 ：70€</span>
                    <span>999¥</span>
                </el-col>
            </el-row>
        </div>
        <div class="divline"></div>
        <div class="card">
            <div class="title">供应商成本流水</div>
            <div>
                <el-table border>
                    <el-table-column label="时间">
                    </el-table-column>
                    <el-table-column label="原因">
                    </el-table-column>
                    <el-table-column label="操作人">
                    </el-table-column>
                    <el-table-column label="金额">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <paymentdialog ref="dialogroup" :dialog="dialog" @closedialog="closedialog"> </paymentdialog>
    </div>
</template>
<script>
    import ajax  from '@local/common/ajax';
    import payment from '../dialogs/PaymentDialog'
    export default{
        components:{
            paymentdialog:payment
        },
        data(){
            return {
                radio: '',
                order:null,
                payplan:null,
                dialog:{
                    show:false
                },
                payflag:false,
                params:{
                    reo:0,
                    currency:'欧元',
                    money:0
                }
            }
        },
        methods: {
            loadorder(){
                ajax.post('/api/team/order/detail',{id:this.$route.params.orderid}).then(
                    data=>{
                        this.order=data.detail;
                    }
                )
            },
            payment(){
                this.dialog.show=true;
                ajax.post('/api/team/pay-stream/collection',this.params).then(
                    data=>{
                        if(data.code==0){
                            vm.closedialog();
                            this.$notify({
                                title: '提交成功',
                                message: '已提交付款信息',
                                type: 'success'
                            });
                        }
                    }
                )
            },
            closedialog(){
                this.dialog.show=false;
            },
            cancelpayment(){

            },
            markpayment(){
                this.$refs.dialogroup.dialog2.show=true;
            }
        },
        computed:{
            money(){
                return this.params.reo*this.params.money;
            }
        },
        mounted(){
            this.loadorder();
        }
    }
</script>