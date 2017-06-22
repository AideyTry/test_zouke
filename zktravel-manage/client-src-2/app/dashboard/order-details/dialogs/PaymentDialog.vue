<style lang="scss" scoped>
    .title {
        font-size: 17px;
        font-weight: 600;
        text-align: center;
    }

    ._mark {
        text-align: center;
    }

    .imgContainer{
        img{
            display: block;
            width: 200px;
            height: 200px;
            margin: 0 auto;
        }
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
                <div class="_mark">扫码将页面发给用户，用户可直接在线支付</div>
                <div class="imgContainer">
                    <img src="//qr.api.cli.im/qr?data=%25E6%2594%25BE%25E5%2581%2587&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=a3ad7e327c0dc5ac0bd03d3e3d364552" />
                </div>
                <div class="_mark"><i class="el-icon-information icon"></i>若用户通过转账付款，需要人工录入付款信息</div>
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
                                v-model="params.paytime"
                                type="date"
                                size="small"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="渠道">
                        <el-radio v-model="params.provider" value="走客转账" label="走客转账"></el-radio>
                        <el-radio v-model="params.provider" value="AE-Link转账" label="AE-Link转账"></el-radio>
                        <el-radio v-model="params.provider" value="信用卡" label="信用卡"></el-radio>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="params.extras"></el-input>
                    </el-form-item>
                    <div class="button-container">
                        <el-button type="info" @click="submit">
                            确定
                        </el-button>
                    </div>
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
                    paytime:new Date(),
                    provider:'走客转账',
                    extras:''
                }
            }
        },
        methods: {
            closedialog(){
                this.dialog2.show=false;
            },
            opendialog(){
                this.dialog2.show=true;
                this.dialog.show=false;
            },
            submit(){
                let vm=this;
                let _params=JSON.parse(JSON.stringify(this.params));
                _params.paytime=new Date(_params.paytime).format('YYYY-MM-DD');
                ajax.post('/api/team/pay-stream/commit',_params).then(
                    data=>{
                        if(data.code==0){
                            vm.closedialog();
                            this.$notify({
                                title: '提交成功',
                                message: '已提交付款信息',
                                type: 'success'
                            });
                        }
                    }
                )
            }
        }
    }
</script>