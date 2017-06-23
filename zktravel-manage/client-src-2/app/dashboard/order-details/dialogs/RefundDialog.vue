<style>

</style>
<template>
    <el-dialog title="填写退款信息"
               :visible.sync="dialog.show"
               size="tiny">

    </el-dialog>
</template>
<script>
    export default{
        props:['dialog'],
        data(){
            return{

            }
        }
    }
</script>