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
        <el-form>
            <el-form-item label="付款政策">
                <el-radio-group v-model="userchannel">
                    <el-radio label="全款"></el-radio>
                    <el-radio label="分期"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="取消政策" prop="desc">
                <el-input type="textarea" v-model="userchannel"></el-input>
            </el-form-item>
            <el-form-item label="报价说明" prop="desc">
                <el-input type="textarea" v-model="userchannel"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default{
        props:['userchannel'],
        data(){
            return{

            }
        }
    }
</script>