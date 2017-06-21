<style lang="scss" scoped>
    .buttonA{
        cursor: pointer;
        text-underline: none;
    }
</style>
<template>
    <el-table
            :data="history.price_history"
            stripe
            style="width: 100%">
        <el-table-column
                prop="id"
                label="编号">
        </el-table-column>
        <el-table-column
                prop="check_pass"
                label="是否通过">
            <template scope="scope">
                {{scope.row.check_pass?'是':'否'}}
            </template>
        </el-table-column>
        <el-table-column
                label="订房员">
            <template scope="scope">
                {{history.booking_user.name}}
            </template>
        </el-table-column>
        <el-table-column
                prop="last_update"
                label="报价时间">
        </el-table-column>
        <el-table-column
                label="操作">
            <template scope="scope">
                <a class="buttonA" @click="submitHistory(scope.row)">应用</a>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
    export default{
        props:['history'],
        data(){
            return{}
        },
        methods:{
            submitHistory(history){
                this.$emit('useHistory',history)
            }
        }
    }
</script>