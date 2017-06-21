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

                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>

</template>
<script>
    export default{
        props: ['dialog'],
        data(){
            return {
                dialog2:{
                    show:false
                }
            }
        },
        methods: {
            closedialog(){
                this.dialog.show=false;
            },
            opendialog(){
                this.dialog2.show=true;
            }
        }
    }
</script>