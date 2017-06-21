<style lang="scss" scoped>
    .title {
        font-size: 17px;
        font-weight: 600;
        text-align: center;
    }

    .mark {
        text-align: center;
    }

    .imgContainer{

    }
    .icon{
        font-size: 12px;
    }
    .el-button{
        margin: 0 auto;
    }
    .button-container{
        margin-top: 10px;
        text-align: center;
    }
</style>
<template>
    <div>
        <el-dialog title="收款码"
                   :visible.sync="dialog.show"
                   size="tiny">
            <div class="dialogcontent">
                <div class="title">收款</div>
                <div class="mark">扫码将页面发给用户，用户可直接在线支付</div>
                <div class="imgContainer">

                </div>
                <div class="mark"><i class="el-icon-information icon"></i>若用户通过转账付款，需要人工录入付款信息</div>
                <div class="button-container">
                    <el-button type="info" @click="opendialog">
                        录入付款信息
                    </el-button>
                </div>
            </div>
        </el-dialog>
        <el-dialog title="付款信息"
                   :visible.sync="dialog2.show"
                   size="tiny">
            <div class="dialogcontent">
                <el-form>
                    <el-form-item label="时间">
                        <el-date-picker
                                v-model="params.date"
                                type="date"
                                size="small"
                                placeholder="选择日期"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="渠道">
                        <el-radio v-model="params.way" value="走客转账" label="走客转账"></el-radio>
                        <el-radio v-model="params.way" value="AE-Link转账" label="AE-Link转账"></el-radio>
                        <el-radio v-model="params.way" value="信用卡" label="信用卡"></el-radio>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="params.mark"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>

</template>
<script>
    import ajax from '@local/common/ajax';
    export default{
        props: ['dialog'],
        data(){
            return {
                dialog2:{
                    show:false
                },
                params:{
                    id:this.$route.params.orderid,
                    payTime:new Date(),
                    road:'走客转账',
                    reMark:''
                }
            }
        },
        methods: {
            closedialog(){
                this.dialog.show=false;
            },
            opendialog(){
                this.dialog2.show=true;
            },
            submit(){
                this.params.payTime=this.params.payTime.format('YYYY-MM-DD');
                ajax.post('api/team/pay-stream/commit',this.params).then(
                    data=>{

                    }
                )
            }
        }
    }
</script>