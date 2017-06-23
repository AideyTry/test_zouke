<style>
    .button-container {
        margin-top: 10px;
        text-align: center;
    }
</style>
<template>
    <el-dialog title="填写退款信息"
               :visible.sync="dialog.show"
               size="tiny">
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
                <el-radio v-model="params.currency" label="欧元">欧元</el-radio>
                <el-radio v-model="params.currency" label="人民币">人民币</el-radio>
            </el-form-item>
            <el-form-item label="退款金额">
                <el-input placeholder="请填写退款金额" v-model="params.money"></el-input>
            </el-form-item>
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
        props: ['dialog'],
        data(){
            return {
                params: {
                    reason: '',
                    refund_time: new Date(),
                    is_cancel: true,
                    path: '走客转账',
                    currency: '欧元',
                    money: ''
                }
            }
        },
        methods:{
            submit(){
                ajax.post('/api/team/refund-stream/refund',{id:this.$route.params.orderid,refund_obj:this.params}).then(
                    data=>{
                        if(data.code==0){
                            this.$notify({
                                title: '提交成功',
                                message: '已提交退款信息',
                                type: 'success'
                            });
                            this.$emit('loadorder');
                        }
                    }
                )
            }
        }
    }
</script>