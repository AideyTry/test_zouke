<style lang="scss" scoped>
    .provider{
        border: 1px solid #CCC;
        margin: 0 auto;
        padding: 10px 20px;
        border-radius: 7px;
        margin-bottom: 40px;
        .el-form-item{
            margin-bottom: 10px;
        }
        .el-input{
            width: 30%;
            min-width: 120px;
        }
    }
</style>
<template>
    <div class="provider">
        <el-form v-if="provider" label-position="left" ref="provider" :rules="rule" :model="provider">
            <el-form-item label="采购渠道" prop="booking_channel">
                <el-input size="small" v-model="provider.booking_channel"></el-input>
            </el-form-item>
            <el-form-item label="付款政策" prop="payment_policy">
                <el-input type="textarea" v-model="provider.payment_policy"></el-input>
            </el-form-item>
            <el-form-item label="取消政策" prop="cancel_policy">
                <el-input type="textarea" v-model="provider.cancel_policy"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="provider.remark"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default{
        props:['provider','index'],
        data(){
            return{
                rule:{
                    booking_channel:[{type:'string',required: true, message: '请填写采购渠道', trigger: 'blur'}],
                    payment_policy:[{type:'string',required: true, message: '请填写付款政策', trigger: 'blur'}],
                    cancel_policy:[{type:'string',required: true, message: '请填写取消政策', trigger: 'blur'}]
                
                }
            }
        },
        computed:{
            validstatus(){
                return this.$state.validfrom;
            }
        },
        watch:{
            validstatus(status){
                if(status){
                    this.$refs['provider'].validate();
                }else {
                    this.$commit('valid',false);
                }
            }
        }
    }
</script>