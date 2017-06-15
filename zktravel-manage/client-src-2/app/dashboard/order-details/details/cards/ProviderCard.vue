<style lang="scss" scoped>
    .provider{
        border: 1px solid #CCC;
        margin: 0 auto;
        padding: 10px 20px;
        border-radius: 7px;
        margin-bottom: 40px;
        .el-form-item{
            margin-bottom: 0;
        }
        .el-input{
            width: 30%;
            min-width: 120px;
        }
    }
</style>
<template>
    <div class="provider">
        <el-form v-if="provider" label-position="left" ref="provider" :model="provider">
            <el-form-item label="采购渠道" prop="booking_channel">
                <el-input size="small" v-model="provider.booking_channel"></el-input>
            </el-form-item>
            <el-form-item label="付款政策" prop="desc">
                <el-input type="textarea" v-model="provider.payment_policy"></el-input>
            </el-form-item>
            <el-form-item label="取消政策" prop="desc">
                <el-input type="textarea" v-model="provider.cancel_policy"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="desc">
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

            }
        }
    }
</script>