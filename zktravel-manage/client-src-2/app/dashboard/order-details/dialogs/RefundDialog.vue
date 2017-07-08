<style>
    .button-container {
        margin-top: 10px;
        text-align: center;
    }
    .line{
        display:inline-block;
        width:100%;

        border-bottom:1px solid #ccc;
    }
</style>
<template>
    <el-dialog title="填写退款信息"
               :visible.sync="dialog.show"
               size="small">
        <el-form>
            <el-form-item label="退款原因">
                <el-input placeholder="请填写退款原因" v-model="params.reason">

                </el-input>
            </el-form-item>
            <el-form-item label="是否取消控房">
                <el-radio v-model="params.is_cancel" :label="true">是</el-radio>
                <el-radio v-model="params.is_cancel" :label="false">否</el-radio>
            </el-form-item>
            <el-form-item label="退款时间">
                <el-date-picker
                        type="date"
                        size="small"
                        v-model="params.refund_time"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="渠道">
                <el-radio v-model="params.path" label="走客转账">走客转账</el-radio>
                <el-radio v-model="params.path" label="AE-Link转账">AE-Link转账</el-radio>
                <el-radio v-model="params.path" label="微信">微信</el-radio>
                <el-radio v-model="params.path" label="支付宝">支付宝</el-radio>
            </el-form-item>
            <el-form-item label="币种">
                <!--<el-radio-group v-model="params.currency">-->
                    <!--<el-radio :label="currency.type">{{genCurrency(params.currency).name}}</el-radio>-->
                    <!--<el-radio label="CNY">人民币</el-radio>-->
                <!--</el-radio-group>-->

                <el-radio-group v-if="order" v-model="params.currency">
                    <el-radio  class="radio" size="small" :label='requireCurrency.type'>{{requireCurrency&&requireCurrency.name}}</el-radio>
                    <el-radio  class="radio" size="small" label="CNY">人民币
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="退款金额">
                <el-row>
                    <el-col :span="12">
                        <el-input type="number" placeholder="请填写退款金额" v-model="params.money"></el-input>
                    </el-col>
                    <el-col :span="2">{{genCurrency(params.currency).name}}</el-col>
                </el-row>
            </el-form-item>
            <span class="line"></span>
            <div>
                <strong>订单成本</strong>
                <!--<span>{{pay_const*(params.currency=='EUR'?order.rates.EUR:order.rates.GBP)}}</span>-->
                <span>{{new_pay_const}}</span>
                <span>{{genCurrency(params.currency).name}}</span>
            </div>
        </el-form>
        <div class="button-container">
            <el-button type="info" @click="submit">
                确定
            </el-button>
        </div>
    </el-dialog>
</template>
<script>
    import ajax from '@local/common/ajax';
    export default{
        props: ['order','pay_const','dialog', 'rates', 'currency'],
        data(){
            return {
                params: {
                    reason: '',
                    refund_time: new Date(),
                    is_cancel: true,
                    path: '走客转账',
                    currency: this.currency.type,
                    money: null
                }
            }
        },
        computed:{
            requireCurrency(){
                let vm=this;
                if(vm.order){
                    return this.genCurrency(vm.order.requirement.currency);
                }
                return {};
            },
            new_pay_const(){
//                let names=genCurrency(params.currency).name;
                if(this.order){
                    return this.pay_const*((this.params.currency)=='CNY'?(this.order.requirement.currency=='EUR'?this.order.rates.EUR:this.order.rates.GBP):1);
                }
            },
            rate(){
              return  (this.order&&this.order.requirement.currency=='EUR'?this.order.rates.EUR:this.order.rates.GBP);
            }
        },
        methods:{
            submit(){
                this.params.refund_time=new Date(this.params.refund_time).format('YYYY-MM-DD');
                this.params.rate = this.order.rates[this.requireCurrency.type];
                ajax.post('/api/team/refund-stream/refund',{id:this.$route.params.orderid,refund_obj:this.params}).then(
                    data=>{
                        if(data.code==0){
                            this.$notify({
                                title: '提交成功',
                                message: '已提交退款信息',
                                type: 'success'
                            });
                            this.dialog.show=false;
                            this.$emit('loadorder');
                        }
                    }
                )
            },
            genCurrency(type){
                switch(type){
                    case 'EUR':
                        return { type, name:'欧元', sign:'€' };
                        break;
                    case 'GBP':
                        return { type, name:'英镑', sign:'￡' };
                        break;
                    case 'CNY':
                        return { type, name:"人民币", sign:'￥'};
                        break;
                    default:
                        return {};
                        break;
                }
            }
        },
        mounted(){
            console.log("order===",this.order);
            console.log("this.params.currency==",this.params.currency);
        }
    }
</script>