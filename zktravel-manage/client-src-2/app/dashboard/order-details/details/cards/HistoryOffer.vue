<style lang="scss" scoped>
    .buttonA{
        cursor: pointer;
        text-underline: none;
    }
</style>
<template>
    <div>
        <el-table
                :data="history.price_history"
                stripe
                border
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="编号">
            </el-table-column>
            <el-table-column
                    prop="check_pass"
                    label="管理员审核状态">
                <template scope="scope">
                    {{scope.row.check_pass?'是':'否'}}
                </template>
            </el-table-column>
             <el-table-column
                    prop="check_pass"
                    label="用户是否通过方案">
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
                    <a class="buttonA" @click="showdialog(scope.row)">查看</a>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="历史订单"
                   :visible.sync="dialog.show" size="large">
            <history :data="data"></history>
        </el-dialog>
    </div>
</template>
<script>
    import history from '../../dialogs/HistoryOfferDialog';
    export default{
        props:['history'],
        components:{
            history:history,
        },
        data(){
            return{
                dialog:{
                    show:false
                },
                data:''
            }
        },
        methods:{
            showdialog(history){
                this.data=history;
                this.dialog.show=true;
            },
            closedialog(){
                this.dialog.show=false;
            }
        }
    }
</script>