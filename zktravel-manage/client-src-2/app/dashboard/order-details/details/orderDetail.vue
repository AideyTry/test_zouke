<style lang="scss" scoped>
    .orderDetail{
        h4{
            margin:0;
            padding:0;
        }
        .orderForm{
            .card{

            }
        }
    }
</style>
<template>
    <div class="orderDetail">
        <el-row type="flex">
            <!--<el-col :span="1"></el-col>-->
            <el-col :span="2">
                <h4>订单信息</h4>
            </el-col>
            <el-col :span="21">
                <span>订单号:</span>
                <span>{{orderId}}</span>
            </el-col>
        </el-row>
        <el-card class="orderForm">
            <el-row type="flex">
                <el-col :span="2">
                    <h4>入住单</h4>
                </el-col>
            </el-row>
            <div class="card">
                <el-row type="flex">
                    <el-col :span="5">
                        <span>入住/离店</span>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>
<script>
    export default{
        props:["orderData"],
        data(){
            return {

            }
        },
        computed:{
            orderId(){
                return this.$route.params.orderid;
            }
        },
        methods:{

        },
        mounted(){
            console.log(this.$route.params);
            console.log(this.orderData);
        }
    }
</script>