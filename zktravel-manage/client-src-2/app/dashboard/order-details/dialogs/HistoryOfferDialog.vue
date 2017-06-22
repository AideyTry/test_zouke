<style>
    .historyDialog{

    }
</style>
<template>
    <div class="historyDialog">
        <el-tabs>
            <el-tab-pane label="历史需求" name="历史需求">

            </el-tab-pane>
            <el-tab-pane label="历史报价" name="历史报价">

            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    export default{
        props:['data'],
        data(){
            return{
                orderdata:[]
            }
        },
        methods:{

        }
    }
</script>