<style>

</style>
<template>
    <el-table
            :data="history"
            stripe
            style="width: 100%">
        <el-table-column
                prop="date"
                label="编号">
        </el-table-column>
        <el-table-column
                prop="address"
                label="订房员">
        </el-table-column>
        <el-table-column
                prop="address"
                label="报价时间">
        </el-table-column>
        <el-table-column
                prop="address"
                label="操作">
        </el-table-column>
    </el-table>
</template>
<script>
    export default{
        props:['history'],
        data(){
            return{}
        }
    }
</script>