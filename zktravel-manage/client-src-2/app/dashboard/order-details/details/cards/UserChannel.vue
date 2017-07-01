<style lang="scss" scoped>
    .provider{
        border: 1px solid #CCC;
        margin: 0 auto;
        padding: 20px 20px;
        border-radius: 7px;
        margin-bottom: 40px;
        .el-form-item{
            margin-bottom: 5px;
        }
        .el-input{
            width: 30%;
            min-width: 120px;
        }
    }
</style>
<template>
    <div class="provider">
        <el-form  ref="ruleForm" :rules="rule" :model="userchannel">
            <el-form-item label="付款政策">
                <el-radio-group v-model="userchannel.type">
                    <el-radio label="全款" value="全款"></el-radio>
                    <el-radio label="分期" value="分期"></el-radio>
                </el-radio-group>
            </el-form-item>
            <template v-for="(v,k) in userchannel.payment">
                <el-form v-if="v"  ref="ruleForm2" :rules="rule2" :model="v">
                <el-form-item label="截止时间" v-if="userchannel.type=='分期'">
                    <el-date-picker
                            v-model="v.dead_line"
                            type="date"
                            size="small"
                            placeholder="选择日期">
                    </el-date-picker>
                    <span>前支付</span>
                    <el-form-item prop="price" style="display:inline-block;">
                    <el-input type="number" v-model="v.price">
                    </el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="截止时间" v-if="userchannel.type=='全款'">
                    <el-date-picker
                            v-model="v.dead_line"
                            type="date"
                            size="small"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>

                </el-form>
            </template>
            <el-row>
                <el-button @click="addchannel" v-if="userchannel.type=='分期'" type="info">新增政策</el-button>
            </el-row>
            <el-form-item label="取消政策" prop="cancel">
                <el-input type="textarea" v-model="userchannel.cancel"></el-input>
            </el-form-item>
            <el-form-item label="报价说明">
                <el-input type="textarea"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default{
        props:['userchannel'],
        data(){
            return{
                rule:{
                    cancel:[{type:'string',required: true, message: '请填写政策', trigger: 'blur'}],
                },
                rule2:{
                    price:[{type:'string',required: true, message: '请填写金额', trigger: 'blur'}]
                }
            }
        },
        methods:{
            addchannel(){
                this.userchannel.payment.push(
                    {
                        dead_line:new Date,
                        price:'1'
                    }
                )
            }
        }
    }
</script>