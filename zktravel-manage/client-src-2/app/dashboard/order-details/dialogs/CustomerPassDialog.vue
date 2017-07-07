<style lang="scss" scoped>
    .el-row{
        text-align: center;
    }
</style>
<template>
    <el-dialog
            title="确定提交"
            :visible.sync="dialoggroup[2].show"
            size="tiny">
        <el-form label-position="left" ref="ruleForm">
            <el-row class="padding-left">
                <el-col>
                    <el-form-item label="确认提交选中方案">
                        <!--<el-select v-model="selectnum" placeholder="请选择方案">-->
                            <!--<template v-for="(v,k) in orderdata">-->
                                <!--<el-option :label="'方案'+(k+1)" :value="k"></el-option>-->
                            <!--</template>-->
                        <!--</el-select>-->
                    </el-form-item>
                </el-col>
            </el-row>
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
        props:['dialoggroup','pickerOptions','selectCase','selectIndex'],
        data(){
            return{
                orderdata:null,
                reason:'',
                params:{
                    id:this.$route.params.orderid,
                    userSelectCase:''
                },
                selectnum:0
            }
        },
        computed:{
            select(){
                return this.$store.getters.select;
            }
        },
        methods:{
            submit(){
                let vm=this;
                ajax.post('/api/team/price/agree',{
                    id:this.$route.params.orderid,
                    index: this.selectCase,
                    selectIndex:this.selectIndex,
                }).then(
                    data=>{
                        if(data.code==0){
                            console.log("打印返回的值",data);
                            vm.close();
                            vm.$notify({
                                title: '操作成功',
                                message: '已成功通过报价',
                                type: 'success'
                            });
                        }else {
                            vm.$notify({
                                title: '请求失败',
                                message: data.msg,
                                type: 'error'
                            });
                        }
                    }
                )
            },
            close(){
                this.$emit('closedialog',3);
            }
        },
        mounted(){
            ajax.post('/api/team/order/detail', {
                id: this.$route.params.orderid
            }).then(
                data=>{
                    this.orderdata=data.detail.price.cases;
                }
            )
        }
    }
</script>