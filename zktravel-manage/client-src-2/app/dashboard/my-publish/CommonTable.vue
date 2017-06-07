<style lang="scss" scoped>

</style>
<template>
    <el-table
            :data="currentData"
            border
            style="width: 100%">
        <el-table-column
                prop="orderNum"
                label="订单号"
        >
        </el-table-column>
        <el-table-column
                prop="userName"
                label="用户名"
        >
        </el-table-column>
        <el-table-column
                prop="orderTime"
                label="下单时间">
        </el-table-column>
        <el-table-column
                prop="priority"
                label="优先级">
        </el-table-column>
        <el-table-column
                prop="goOff"
                label="出发时间">
        </el-table-column>
        <el-table-column
                v-if="isTrue"
                prop="orderStatus"
                label="状态">
        </el-table-column>
        <el-table-column
                prop="quoter"
                label="报价员">
        </el-table-column>
        <el-table-column
                prop="orderAmount"
                label="订单金额">
        </el-table-column>
        <el-table-column
                prop="publishDate"
                label="发布日期">
        </el-table-column>
    </el-table>
</template>
<script>
    export default{
        props:["currentData","isTrue"],
        data(){
            return{

            }
        },
        methods:{
            update(){

                if(this.$route.path=="/dashboard/my-publish/wait-publish"){
                    for(let obj of this.currentData){
                        obj.orderStatus="待发布"
                    }
                }else if(this.$route.path=="/dashboard/my-publish/wait-distribution"){
                    for(let obj of this.currentData){
                        obj.orderStatus="待分配"
                    }
                }else if(this.$route.path=="/dashboard/my-publish/quote"){
                    for(let obj of this.currentData){
                        obj.orderStatus="报价中"
                    }
                }else if(this.$route.path=="/dashboard/my-publish/wait-confirmed"){
                    for(let obj of this.currentData){
                        obj.orderStatus="报价待确认"
                    }
                }else if(this.$route.path=="/dashboard/my-publish/wait-gathering"){
                    for(let obj of this.currentData){
                        obj.orderStatus="待收款"
                    }
                }else if(this.$route.path=="/dashboard/my-publish/house-wait-distribution"){
                    for(let obj of this.currentData){
                        obj.orderStatus="分房待确认"
                    }
                }else if(this.$route.path=="/dashboard/my-publish/wait-control-house"){
                    for(let obj of this.currentData){
                        obj.orderStatus="待控房"
                    }
                }else if(this.$route.path=="/dashboard/my-publish/control-house"){
                    for(let obj of this.currentData){
                        obj.orderStatus="已控房"
                    }
                }else if(this.$route.path=="/dashboard/my-publish/require-invoice"){
                    for(let obj of this.currentData){
                        obj.orderStatus="需开发票"
                    }
                }
            }
        },
        beforeUpdate(){
            this.update();
        }
    }
</script>