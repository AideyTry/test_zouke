<style lang="scss" scoped>
    .rooming{
        .el-col{
            text-align:center;
            h4{
                padding-bottom:10px;
                vertical-align:middle;
            }
            .el-button{
                display:inline-block;
                padding:10px 40px;
            }
        }
    }
</style>
<template>
    <div>
        <div class="rooming">
            <el-row type="flex">
                <el-col :span="24" class="orderMsg">
                    <h4>暂无订单信息</h4>
                </el-col>
            </el-row>
        </div>
        <el-row type="flex">
            <el-col :span="2">
                <h4>分房名单</h4>
            </el-col>
        </el-row>
        <el-row type="flex">
            <!--<el-form-item>-->
                <el-input type="textarea" v-model="content" :disabled="isTrue"></el-input>
            <!--</el-form-item>-->
        </el-row>
        <el-button type="info" @click="submitform" size="small">保存
        </el-button>
    </div>
</template>
<script>
    import ajax from '@local/common/ajax';
    export default{
        props:["orderData"],
        data(){
            return {
                    content:'',
                    newContent:'',
                    isTrue:false
            }
        },
        methods:{
            loadform(){
                if(this.orderData.allot_list){
                    this.newContent=this.orderData.allot_list.content;
                    this.content=this.newContent;
                    console.log("分房",this.content);
                }
                    },
            submitform(){
                if(this.content.length===0){
                    this.$message({
                        message:"请输入内容！",
                        type:'error'
                    })
                }else{
                    ajax.post('/api/team/allot-list/collection',{id:this.$route.params.orderid,content:this.content}).then(
                        data => {
                            if (data.code == 0) {
                                this.$notify({
                                    title: '保存成功',
                                    message: '已保存成功,请到订房员处查看',
                                    type: 'success'
                                });
//                            this.$router.push({name:"dashboard-order-detail",params:{orderid:data.orderId,status:'require-node'}});
                            }
                        }
                    )
                    this.isTrue=true;
                }
            }
        },
        mounted(){
            this.loadform();
        }
    }
</script>