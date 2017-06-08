<style lang="scss" scoped>
    .order-detail-container {
        height: 100%;
        width: 100%;
        padding: 0 30px;
        color: #1F2D3D;

        .title{
            height: 60px;
            font-size: 18px;
            line-height: 60px;
            .el-col{
                min-width: 176px;
            }
            .status{
                border: 1px solid #FF4949;
                font-size: 14px;
                color: #FF4949;
                display: inline-block;
                height: 30px;
                width: 80px;
                line-height: 30px;
                text-align: center;
                border-radius: 15px;
            }
        }
        .order-detail {
            height: 100%;
            width: 100%;
            background: #F9FAFC;
            padding: 0px 20px;
            h4{
                display: inline-block;
                width: 80px;
            }
            .el-tag{
                margin: 0 20px;
            }
        }

        .detail-title{
            height: 40px;
            line-height: 40px;
        }

        .creator-info{
            height: 40px;
            line-height: 40px;
            span{
                display: inline-block;
                margin: 0 10px;
            }
        }
    }
</style>

<template>
    <div class="order-detail-container">
        <el-row class="title">
            <el-col :span="4">
                <span class="title">我的需求 > 订单详情</span>
            </el-col>
            <el-col :span="4">
                <span class="status">待发布</span>
            </el-col>
        </el-row>
        <div class="order-detail">
            <el-tabs  @tab-click="changetab" active-name="require-node">
                <el-tab-pane label="需求记录" name="require-node">
                    <el-row style="height: 40px">
                        <el-col :span="12">
                            <h4>需求详情</h4>
                            <el-tag key="优先级A+" type="gray">优先级A+</el-tag>
                            <el-tag key="GTA" type="gray">GTA导游</el-tag>
                        </el-col>
                        <el-col :span="12" class="creator-info">
                            <span>创建:</span>
                            <span>{{orderdata.creator.name}}</span>
                            <span>发布时间:</span>
                            <span>{{orderdata.create_time}}</span>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="报价记录" name="offer-node">

                </el-tab-pane>
                <el-tab-pane label="订单详情" name="order-detail">

                </el-tab-pane>
                <el-tab-pane label="收入/支出" name="in-out">

                </el-tab-pane>
                <el-tab-pane label="开票记录" name="ticket-node">

                </el-tab-pane>
                <el-tab-pane label="投诉记录" name="complain-node">

                </el-tab-pane>
                <el-tab-pane label="留言/操作" name="message-node">

                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import ajax  from '@local/common/ajax';
    export default{
        data(){
            return{
                orderdata:{
                    creator:{
                        name:''
                    }
                }
            }
        },
        methods:{
            changetab(){

            },
            getorder(id){
                let vm=this;
                ajax.post('/api/offline-order/detail',{
                    id:id
                }).then(
                    data=>{
                        vm.orderdata=data.detail;
                    }
                )
            }
        },
        computed:{

        },
        created(){
            this.getorder(this.$route.params.orderid);
        }
    }
</script>