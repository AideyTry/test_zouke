<style lang="scss" scoped>
    .el-row{
        text-align: center;
    }
</style>
<template>
    <el-dialog
            title="重新报价"
            :visible.sync="dialoggroup[1].show"
            size="tiny">
        <el-form label-position="top" ref="ruleForm">
            <el-form-item label="请填写拒绝理由">
                <el-input type="textarea" v-model="reason">

                </el-input>
            </el-form-item>
            <el-row>
                <el-col>
                    <el-button @click="submit" type="info" size="large">确定</el-button>
                </el-col>
            </el-row>
        </el-form>
    </el-dialog>
</template>
<script>
    import ajax  from '@local/common/ajax';
    export default{
        props:['dialoggroup','pickerOptions'],
        data(){
            return{
                user:[],
                reason:'',
                params:{
                    id:this.$route.params.orderid,
                    reason:this.reason
                }
            }
        },
        methods:{
            submit(){
                let vm=this;
                ajax.post('/api/team/price/reject',this.params).then(
                    data=>{
                        if(data.code==0){
                            vm.close();
                            vm.$notify({
                                title: '驳回成功',
                                message: '已成功驳回',
                                type: 'success'
                            });
                        }else {
                            vm.$notify({
                                title: '请求失败',
                                message: data.msg,
                                type: 'error'
                            });
                        }
                        vm.dialoggroup[1].show=false;
                    }
                )
            },
            close(){
                this.$emit('closedialog','1');
            }
        },
        mounted(){

        }
    }
</script>