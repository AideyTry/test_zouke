<style lang="scss" scoped>
    .orderDetail{
        h4{
            margin:0;
            padding:0;
        }
    }
</style>
<template>
    <div class="orderDetail">
        <el-row type="flex">
            <el-col :span="2">
                <h4>订单信息</h4>
            </el-col>
            <el-col :span="4">
                <span>订单号:</span>
                <span>{{orderInfo}}</span>
            </el-col>
            <el-col :span="18"></el-col>
        </el-row>
    </div>
</template>
<script>
    export default{
        data(){
            return {

            }
        },
        computed:{
            orderInfo(){
                return this.$store.getters.orderInfo;
            }
        },
        methods:{

        },
        mounted(){

        }
    }
</script>