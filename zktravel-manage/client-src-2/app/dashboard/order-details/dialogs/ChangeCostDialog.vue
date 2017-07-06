<style>
    .button-container {
        margin-top: 10px;
        text-align: center;
    }
</style>
<template>
    <el-dialog title="修改订单成本" :visible.sync="dialog.show"
               size="tiny">
        <el-form>
            <el-form-item label="选择供应商">
                <el-select v-model="params.supplier_name" placeholder="请选择">
                    <el-option
                            v-for="item in channel"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="修改原因" >
                <el-input v-model="params.reason" placeholder="请填写修改原因">

                </el-input>
            </el-form-item>
            <el-form-item label="填写金额" type="number">
                <el-input type="number" v-model="params.cost" placeholder="请填写金额">

                </el-input>
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
        props:['dialog'],
        data(){
            return{
                params:{
                    supplier_name:'',
                    reason:'',
                    cost:''
                },
                channel: [{
                    value: 'GTA',
                    label: 'GTA'
                }, {
                    value: 'miki',
                    label: 'miki'
                }]
            }
        },
        methods:{
            submit(){
                ajax.post('/api/team/provider-stream/change',{id:this.$route.params.orderid,provider_obj:this.params}).then(
                    data=>{
                        if(data.code==0){
                            this.$notify({
                                title: '提交成功',
                                message: '已提交付款信息',
                                type: 'success'
                            });
                            this.closedialog();
                            this.$emit('loadorder');
                        }
                    }
                )
            },
            closedialog(){
                this.dialog.show=false;
            }
        }
    }
</script>